import WPCOM from 'wpcom';
const CLIENT_ID = 39911;
const CLIENT_SECRET = 'cOaYKdrkgXz8xY7aysv4fU6wL6sK5J8a6ojReEIAPwggsznj4Cb6mW0nffTxtYT8';

import paygateLoader from 'lib/paygate-loader';

let wpcomAPI = WPCOM();

export function selectDomain( domain ) {
	return {
		type: 'SELECT_DOMAIN',
		domain
	};
}

export function createUser( username, email, password ) {
	return dispatch => {
		wpcomAPI.req.post( '/users/new', {
			username,
			email,
			password,
			validate: false,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET
		}, ( error, data ) => {
			dispatch( createUserComplete( username, email, password, data.bearer_token ) );

			wpcomAPI = WPCOM( data.bearer_token );
		} )
	};
}

export function createUserComplete( username, email, password, bearerToken ) {
	return {
		type: 'CREATE_USER_COMPLETE',
		username,
		email,
		password,
		bearerToken
	};
}

export function createSite( slug ) {
	return dispatch => {
		wpcomAPI.req.post( '/sites/new', {
			blog_name: slug,
			blog_title: slug,
			lang_id: 1,
			locale: 'en',
			validate: false,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET
		}, ( error, data ) => {
			dispatch( createSiteComplete( slug, data.blog_details.blogid ) );
		} );
	};
}

export function createSiteComplete( slug, blogId ) {
	return {
		type: 'CREATE_SITE_COMPLETE',
		slug,
		blogId
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
	wpcomAPI.req.get( '/me/paygate-configuration', { request_type: requestType }, function ( error, configuration ) {
		if ( error ) {
			callback( error );
			return;
		}

		paygateLoader.ready( configuration.js_url, function( error, Paygate ) {
			var parameters;
			if ( error ) {
				callback( error );
				return;
			}

			Paygate.setProcessor( configuration.processor );
			Paygate.setApiUrl( configuration.api_url );
			Paygate.setPublicKey( configuration.public_key );
			Paygate.setEnvironment( configuration.environment );

			parameters = getPaygateParameters( cardDetails );
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

export function createTransaction( domainName, blogId ) {
	const cardDetails = {
		name: 'John Smith',
		number: '4556247566398191',
		cvv: '451',
		'expiration-date': '01/20',
		'postal-code': '94705'
	};

	return dispatch => {
		createPaygateToken( 'new_purchase', cardDetails, function( error, response ) {
			wpcomAPI.req.post( '/me/transactions', {
				'payment_key': response,
				'payment_method': 'WPCOM_Billing_MoneyPress_Paygate',
				'locale': 'en',
				'cart': {
					'blog_id': blogId,
					'currency': 'GBP',
					'temporary': 1,
					'extra': {},
					'products': [
						{
							'product_id': 6,
							'meta': domainName,
							'volume': 1,
							'free_trial': false,
						}
					],
				},
				'domain_details': {
					'first_name': 'Wesley',
					'last_name': 'Snipes',
					'address_1': 'The Tomb of Dracula road',
					'city': 'Boston',
					'state': 'MA',
					'postal_code': '02110',
					'country_code': 'US',
					'email': 'wesley@snipes.com',
					'phone': '666-666-666',
				}
			}, ( error, data ) => {
				dispatch( createTransactionComplete( site ) );
			} );
		} );
	};
}

export function createTransactionComplete( site ) {
	return {
		type: 'CREATE_TRANSACTION_COMPLETE',
		site
	};
}