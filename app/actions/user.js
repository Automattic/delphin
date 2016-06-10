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
 * @param {function} [callback] optional callback to call upon success
 * @returns {object} the corresponding action object
 */
export function connectUser( email, intention, callback ) {
	return {
		type: WPCOM_REQUEST,
		method: 'post',
		params: { path: intention === 'signup' ? '/users/email/new' : '/users/email' },
		payload: { email },
		loading: { type: CONNECT_USER, email, intention },
		success: ( data ) => {
			return dispatch => {
				if ( data.warning ) {
					dispatch( {
						notice: data.message,
						type: CONNECT_USER_WARNING
					} );
				}

				dispatch( {
					email,
					twoFactorAuthenticationEnabled: data.two_factor_authentication_enabled,
					type: CONNECT_USER_COMPLETE
				} );

				callback && callback();
			};
		},
		fail: CONNECT_USER_FAIL
	};
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
		params: { path: '/me/settings' },
		loading: FETCH_USER,
		success: ( data, requestArguments, requestToken ) => ( {
			type: FETCH_USER_COMPLETE,
			bearerToken: requestToken,
			firstName: data.first_name,
			lastName: data.last_name,
			email: data.email,
			locale: data.language
		} ),
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

export function verifyUser( email, code, twoFactorAuthenticationCode, { showSuccessNotice } = { showSuccessNotice: true } ) {
	return {
		type: WPCOM_REQUEST,
		method: 'post',
		params: { path: '/users/email/verification' },
		payload: { email, code, two_factor_authentication_code: twoFactorAuthenticationCode },
		loading: VERIFY_USER,
		success: ( data ) => {
			return dispatch => {
				dispatch( { type: VERIFY_USER_COMPLETE, bearerToken: data.token.access_token } );

				// Wait for fetch user action to complete, then display a notice
				dispatch( fetchUser() )
					.then( () => {
						if ( ! showSuccessNotice ) {
							return;
						}

						dispatch( addNotice( {
							message: i18n.translate( 'You were successfully logged in!' ),
							status: 'success'
						} ) );
					} );
			};
		},
		fail: ( error ) => {
			return dispatch => {
				dispatch( {
					type: VERIFY_USER_FAIL
				} );

				if ( error.error === 'invalid_verification_code' ) {
					return Promise.reject( { code: error.message } );
				}

				if ( error.error === 'invalid_2FA_code' ) {
					return Promise.reject( { twoFactorAuthenticationCode: error.message } );
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
