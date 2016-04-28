// External dependencies
import request from 'superagent';
import uniqueId from 'lodash/uniqueId';
import WPCOM from 'wpcom';

// Internal dependencies
import {
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	CREATE_USER_COMPLETE,
	CREATE_USER_WITHOUT_PASSWORD,
	CREATE_USER_WITHOUT_PASSWORD_COMPLETE,
	NOTICE_ADD,
	NOTICE_CLEAR,
	REMOVE_USER,
	VERIFY_USER,
	VERIFY_USER_COMPLETE
} from 'reducers/action-types';
import paygateLoader from 'lib/paygate-loader';

let wpcomAPI = WPCOM(),
	bearerToken;

export function removeUser() {
	return { type: REMOVE_USER };
}

export function createUser( form ) {
	return dispatch => {
		const payload = {
			username: form.username,
			email: form.email,
			password: form.password,
			validate: false
		};

		request.post( '/users/new' ).send( payload ).end( ( error, results ) => {
			if ( error ) {
				return dispatch( addNotice( error ) );
			}

			const data = JSON.parse( results.text );

			// Reinitialize WPCOM so that future requests with be authed
			wpcomAPI = WPCOM( data.bearer_token );

			// Save the bearer token for future requests
			bearerToken = data.bearer_token;

			dispatch( createUserComplete( form, data.bearer_token ) );
		} );
	};
}

export function createUserComplete( form, token ) {
	return {
		type: CREATE_USER_COMPLETE,
		username: form.username,
		email: form.email,
		password: form.password,
		bearerToken: token
	};
}

export function createUserWithoutPassword( email ) {
	return dispatch => {
		dispatch( {
			type: CREATE_USER_WITHOUT_PASSWORD,
			email
		} );

		request.post( '/users/email/new' ).send( { email } ).end( ( error ) => {
			if ( error ) {
				return;
			}

			dispatch( {
				type: CREATE_USER_WITHOUT_PASSWORD_COMPLETE,
				email
			} );
		} );
	};
}

export function verifyUser( email, code ) {
	return dispatch => {
		dispatch( { type: VERIFY_USER } );

		request.post( '/users/email/verification' ).send( { email, code } ).end( ( error, response ) => {
			if ( error ) {
				return;
			}

			bearerToken = response.body.token.access_token;
			dispatch( { type: VERIFY_USER_COMPLETE, bearerToken } );
		} );
	};
}

export function createSite( form ) {
	return dispatch => {
		const payload = {
			bearer_token: bearerToken,
			blog_name: form.domain,
			blog_title: form.domain,
			lang_id: 1,
			locale: 'en',
			validate: false,
			find_available_url: true
		};

		request.post( '/sites/new' ).send( payload ).end( ( error, results ) => {
			if ( error ) {
				return dispatch( addNotice( error ) );
			}

			const data = JSON.parse( results.text );

			dispatch( createSiteComplete( Object.assign( {}, form, { blogId: data.blog_details.blogid } ) ) );
		} );
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
	wpcomAPI.req.get( '/me/paygate-configuration', { request_type: requestType }, function( error, configuration ) {
		if ( error ) {
			callback( error );
			return;
		}

		paygateLoader.ready( configuration.js_url, function( innerError, Paygate ) {
			if ( innerError ) {
				callback( innerError );
				return;
			}

			Paygate.setProcessor( configuration.processor );
			Paygate.setApiUrl( configuration.api_url );
			Paygate.setPublicKey( configuration.public_key );
			Paygate.setEnvironment( configuration.environment );

			const parameters = getPaygateParameters( cardDetails );
			Paygate.createToken( parameters, onSuccess, onFailure );
		} );
	} );

	function onSuccess( data ) {
		if ( data.is_error ) {
			return callback( new Error( 'Paygate Response Error: ' + data.error_msg ) );
		}

		callback( null, data.token );
	}

	function onFailure() {
		callback( new Error( 'Paygate Request Error' ) );
	}
}

export function createTransaction( form ) {
	const cardDetails = {
		bearer_token: bearerToken,
		name: form.name,
		number: form['credit-card-number'],
		cvv: form.cvv,
		'expiration-date': form['expiration-date'],
		'postal-code': form['postal-code']
	};

	return dispatch => {
		createPaygateToken( 'new_purchase', cardDetails, function( error, response ) {
			const payload = {
				bearer_token: bearerToken,
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

			wpcomAPI.req.post( '/me/transactions', payload, ( apiError, apiResults ) => {
				console.log( apiError || apiResults );
				dispatch( createTransactionComplete( form ) );
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

export function addNotice( notice ) {
	notice.id = uniqueId();
	return {
		notice,
		type: NOTICE_ADD
	};
}

export function clearNotice( notice ) {
	return {
		notice,
		type: NOTICE_CLEAR
	};
}
