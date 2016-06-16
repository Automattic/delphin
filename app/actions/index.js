// External dependencies
import { getValues } from 'redux-form';
import debugFactory from 'debug';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	VERIFY_USER,
	WPCOM_REQUEST
} from 'reducers/action-types';
import { getCheckout } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import { snakeifyKeys } from 'lib/formatters';
import paygateLoader from 'lib/paygate-loader';

// Module variables
const debug = debugFactory( 'delphin:actions' );

export function createSite() {
	return ( dispatch, getState ) => {
		const user = getUserSettings( getState() ),
			{ domain } = getCheckout( getState() );

		dispatch( {
			type: WPCOM_REQUEST,
			method: 'post',
			params: { path: '/sites/new' },
			payload: {
				bearer_token: user.data.bearerToken,
				blog_name: domain,
				blog_title: domain,
				lang_id: 1,
				locale: 'en',
				validate: false,
				find_available_url: true
			},
			loading: VERIFY_USER,
			success: ( data ) => createSiteComplete( data.blog_details.blogid ),
			fail: ( error ) => addNotice( {
				message: error.message,
				status: 'error'
			} )
		} );
	};
}

export function createSiteComplete( blogId ) {
	return {
		type: CREATE_SITE_COMPLETE,
		blogId
	};
}

function getPaygateParameters( cardDetails ) {
	return {
		name: cardDetails.name,
		number: cardDetails.number,
		cvc: cardDetails.cvv,
		zip: cardDetails.postalCode,
		country: cardDetails.country,
		exp_month: cardDetails.expirationDate.substring( 0, 2 ),
		exp_year: '20' + cardDetails.expirationDate.substring( 2, 4 )
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
		type: WPCOM_REQUEST,
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

			return { type: 'UNRELATED' };
		},
		fail: ( error ) => {
			callback && callback( error );
		}
	};
}

// TODO: Ensure that the user provides an email without a + on `ContactInformation`
const stripEmailLabel = email => email.replace( /\+[0-9A-z-]+/g, '' );

export function createTransaction() {
	return ( dispatch, getState ) => {
		const user = getUserSettings( getState() ),
			checkout = getCheckout( getState() ),
			{ domain } = checkout,
			{ blogId } = checkout.site,
			checkoutForm = getValues( getState().form.checkout ),
			cardDetails = {
				name: checkoutForm.name,
				number: checkoutForm.number,
				cvv: checkoutForm.cvv,
				expirationDate: checkoutForm.expirationMonth + checkoutForm.expirationYear,
				postalCode: null // TODO: do we need these values?
			},
			contactInformationForm = getValues( getState().form[ 'contact-information' ] ),
			domainDetails = Object.assign( snakeifyKeys( contactInformationForm ), {
				email: stripEmailLabel( user.data.email )
			} );

		dispatch( createPaygateToken( 'new_purchase', cardDetails, function( error, response ) {
			const payload = {
				bearer_token: user.data.bearerToken,
				payment_key: response,
				payment_method: 'WPCOM_Billing_MoneyPress_Paygate',
				locale: 'en',
				cart: {
					blog_id: blogId,
					currency: 'GBP',
					temporary: 1,
					extra: {},
					products: [
						{
							product_id: 6,
							meta: domain,
							volume: 1,
							free_trial: false
						}
					]
				},
				domain_details: domainDetails
			};

			dispatch( {
				type: WPCOM_REQUEST,
				method: 'post',
				params: { path: '/me/transactions' },
				payload,
				loading: VERIFY_USER,
				success: ( data ) => {
					debug( data );
					return createTransactionComplete( blogId, domain );
				},
				fail: ( apiError ) => addNotice( {
					message: apiError.message,
					status: 'error'
				} )
			} );
		} ) );
	};
}

export function createTransactionComplete( blogId, domain ) {
	return {
		type: CREATE_TRANSACTION_COMPLETE,
		blogId,
		domain
	};
}
