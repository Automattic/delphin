// External dependencies
import debugFactory from 'debug';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	VERIFY_USER,
	WPCOM_REQUEST
} from 'reducers/action-types';
import paygateLoader from 'lib/paygate-loader';

// Module variables
const debug = debugFactory( 'delphin:actions' );

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
