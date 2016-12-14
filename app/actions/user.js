// External dependencies
import i18n from 'i18n-calypso';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CONNECT_USER,
	CONNECT_USER_CLEAR,
	CONNECT_USER_COMPLETE,
	CONNECT_USER_FAIL,
	CONNECT_USER_WARNING,
	FETCH_USER,
	FETCH_USER_COMPLETE,
	FETCH_USER_FAIL,
	LOGOUT_USER,
	VERIFY_USER,
	VERIFY_USER_COMPLETE,
	VERIFY_USER_FAIL,
	WPCOM_REQUEST
} from 'reducers/action-types';
import { identifyUser, withAnalytics } from 'actions/analytics';

/**
 * Resets the flag indicating that a user was connected successfully.
 *
 * @returns {object} the corresponding action object
 */
export function clearConnectUser() {
	return { type: CONNECT_USER_CLEAR };
}

/**
 * Connects a user to a new or existing account by sending a confirmation code to the specified email.
 *
 * @param {string} email address of the user
 * @param {string} intention of the user (e.g. 'login' or 'signup')
 * @param {string} domain the user selected, if any
 * @param {function} [callback] optional callback to call upon success
 * @returns {object} the corresponding action object
 */
export function connectUser( email, intention, domain, callback ) {
	return {
		type: WPCOM_REQUEST,
		method: 'post',
		params: { path: intention === 'signup' ? '/users/email/new' : '/users/email' },
		payload: { email, service_slug: 'delphin', domain },
		loading: { type: CONNECT_USER, email, intention },
		success: ( data ) => {
			return dispatch => {
				if ( data.warning ) {
					let innerIntention = intention;

					if ( data.warning === 'sign_up_attempt_with_existing_account' ) {
						innerIntention = 'login';
					} else if ( data.warning === 'log_in_attempt_with_new_account' ) {
						innerIntention = 'signup';
					}

					dispatch( {
						notice: data.message,
						type: CONNECT_USER_WARNING,
						intention: innerIntention
					} );
				}

				dispatch( connectUserComplete( {
					email,
					twoFactorAuthenticationEnabled: !! data.twoFactorAuthenticationEnabled
				} ) );

				callback && callback();
			};
		},
		fail: error => dispatch => {
			dispatch( { type: CONNECT_USER_FAIL } );

			return Promise.reject( { email: { data: error.message } } );
		}
	};
}

export function connectUserComplete( { email, twoFactorAuthenticationEnabled, intention } ) {
	const action = {
		email,
		twoFactorAuthenticationEnabled,
		type: CONNECT_USER_COMPLETE
	};

	if ( intention ) {
		Object.assign( action, { intention } );
	}

	return action;
}

/**
 * Fetches the user profile.
 *
 * @returns {object} the corresponding action object
 */
export function fetchUser() {
	return {
		type: WPCOM_REQUEST,
		method: 'get',
		params: { path: '/me' },
		loading: FETCH_USER,
		success: withAnalytics(
					data => identifyUser( data.id, data.username ),
					( data, requestArguments, requestToken ) => ( {
						type: FETCH_USER_COMPLETE,
						bearerToken: requestToken,
						email: data.email,
						id: data.id,
						language: data.language,
						username: data.username,
					} )
				),
		fail: FETCH_USER_FAIL
	};
}

/**
 * Logs the user out and deletes any bearer cookie on the client.
 *
 * @returns {object} the corresponding action object
 */
export function logoutUser() {
	return { type: LOGOUT_USER };
}

export function verifyUser( email, code, twoFactorAuthenticationCode ) {
	return {
		type: WPCOM_REQUEST,
		method: 'post',
		params: { path: '/users/email/verification' },
		payload: { email, code, two_factor_authentication_code: twoFactorAuthenticationCode },
		loading: VERIFY_USER,
		success: ( data ) => {
			return dispatch => {
				dispatch( { type: VERIFY_USER_COMPLETE, bearerToken: data.token.accessToken } );

				return dispatch( fetchUser() );
			};
		},
		fail: ( error ) => {
			return dispatch => {
				dispatch( {
					type: VERIFY_USER_FAIL
				} );

				if ( error.error === 'invalid_verification_code' ) {
					return Promise.reject( { code: i18n.translate( 'Enter your code just as it is in the email.' ) } );
				}

				if ( error.error === 'invalid_2FA_code' ) {
					return Promise.reject( {
						twoFactorAuthenticationCode: i18n.translate( 'You entered an invalid code. Please try again.'
					) } );
				}

				// If the error isn't invalid_verification_code or invalid_2FA_code
				// Then add it as a global notice
				dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );
			};
		}
	};
}
