// External dependencies
import debugFactory from 'debug';
import i18n from 'i18n-calypso';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CONNECT_USER,
	CONNECT_USER_COMPLETE,
	CONNECT_USER_FAIL,
	CONNECT_USER_WARNING,
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	FETCH_USER,
	FETCH_USER_COMPLETE,
	FETCH_USER_FAIL,
	LOGOUT_USER,
	VERIFY_USER,
	VERIFY_USER_COMPLETE,
	VERIFY_USER_FAIL,
	WPCOM_REQUEST
} from 'reducers/action-types';
import paygateLoader from 'lib/paygate-loader';

// Module variables
const debug = debugFactory( 'delphin:actions' );

/**
 * Connects a user to a new or existing accout by sending a confirmation code to the specified email.
 *
 * @param {string} email address of the user
 * @param {string} intention of the user - login or signup
 * @param {function} [callback] optional callback to call upon success
 * @returns {function} the corresponding action thunk
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
 * Fetches the user profile with the specified access token.
 *
 * @param {object} options - Contains a parameter, `displaySuccessNotice`, which determines if a success
 * notice is displayed after the user is fetched.
 * @returns {Object} fetch user action
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

export function verifyUser( email, code, twoFactorAuthenticationCode ) {
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
					.then( () => dispatch( addNotice( {
						message: i18n.translate( 'You were successfully logged in!' ),
						status: 'success'
					} ) ) );
			};
		},
		fail: ( error ) => {
			return dispatch => {
				dispatch( {
					type: VERIFY_USER_FAIL
				} );

				if ( error.error === 'invalid_verification_code' ) {
					Promise.reject( { code: error.message } );

					return;
				}

				if ( error.error === 'invalid_2FA_code' ) {
					Promise.reject( { twoFactorAuthenticationCode: error.message } );

					return;
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

export function createSite( user, form ) {
	return {
		type: WPCOM_REQUEST,
		method: 'post',
		params: { path: '/sites/new' },
		payload: {
			bearer_token: user.data.bearerToken,
			blog_name: form.domain,
			blog_title: form.domain,
			lang_id: 1,
			locale: 'en',
			validate: false,
			find_available_url: true
		},
		loading: VERIFY_USER,
		success: ( data ) => createSiteComplete( Object.assign( {}, form, { blogId: data.blog_details.blogid } ) ),
		fail: ( error ) => addNotice( {
			message: error.message,
			status: 'error'
		} )
	};
}

export function createSiteComplete( form ) {
	return {
		type: CREATE_SITE_COMPLETE,
		domain: form.domain,
		blogId: form.blogId
	};
}

function getPaygateParameters( cardDetails ) {
	return {
		name: cardDetails.name,
		number: cardDetails.number,
		cvc: cardDetails.cvv,
		zip: cardDetails['postal-code'],
		country: cardDetails.country,
		exp_month: cardDetails['expiration-date'].substring( 0, 2 ),
		exp_year: '20' + cardDetails['expiration-date'].substring( 3, 5 )
	};
}

function createPaygateToken( requestType, cardDetails, callback ) {
	function onSuccess( data ) {
		if ( data.is_error ) {
			callback( new Error( 'Paygate Response Error: ' + data.error_msg ) );

			return;
		}

		callback( null, data.token );
	}

	function onFailure() {
		callback( new Error( 'Paygate Request Error' ) );
	}

	return {
		method: 'get',
		params: { path: '/me/paygate-configuration' },
		query: { request_type: requestType },
		success: ( data ) => {
			const configuration = data;
			paygateLoader.ready( configuration.js_url, function( error, Paygate ) {
				if ( error ) {
					callback( error );

					return;
				}

				Paygate.setProcessor( configuration.processor );
				Paygate.setApiUrl( configuration.api_url );
				Paygate.setPublicKey( configuration.public_key );
				Paygate.setEnvironment( configuration.environment );

				const parameters = getPaygateParameters( cardDetails );
				Paygate.createToken( parameters, onSuccess, onFailure );
			} );
		},
		fail: ( error ) => {
			callback && callback( error );
		}
	};
}

export function createTransaction( user, form ) {
	const cardDetails = {
		name: form.name,
		number: form['credit-card-number'],
		cvv: form.cvv,
		'expiration-date': form['expiration-date'],
		'postal-code': form['postal-code']
	};

	return dispatch => {
		createPaygateToken( 'new_purchase', cardDetails, function( error, response ) {
			const payload = {
				bearer_token: user.data.bearerToken,
				payment_key: response,
				payment_method: 'WPCOM_Billing_MoneyPress_Paygate',
				locale: 'en',
				cart: {
					blog_id: form.blogId,
					currency: 'GBP',
					temporary: 1,
					extra: {},
					products: [
						{
							product_id: 6,
							meta: form.domain,
							volume: 1,
							free_trial: false
						}
					]
				},
				domain_details: {
					first_name: 'Wesley',
					last_name: 'Snipes',
					address_1: 'The Tomb of Dracula road',
					city: 'Boston',
					state: 'MA',
					postal_code: '02110',
					country_code: 'US',
					email: 'wesley@snipes.com',
					phone: '666-666-666'
				}
			};

			dispatch( {
				type: WPCOM_REQUEST,
				method: 'post',
				params: { path: '/me/transactions' },
				payload,
				loading: VERIFY_USER,
				success: ( data ) => {
					debug( data );
					return createTransactionComplete( form );
				},
				fail: ( apiError ) => addNotice( {
					message: apiError.message,
					status: 'error'
				} )
			} );
		} );
	};
}

export function createTransactionComplete( form ) {
	return {
		type: CREATE_TRANSACTION_COMPLETE,
		form
	};
}
