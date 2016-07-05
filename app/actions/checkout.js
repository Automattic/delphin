// External dependencies
import { getValues } from 'redux-form';
import debugFactory from 'debug';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	PAYGATE_CONFIGURATION_FETCH,
	PAYGATE_CONFIGURATION_FETCH_COMPLETE,
	PAYGATE_CONFIGURATION_FETCH_FAIL,
	PAYGATE_TOKEN_CREATE,
	PAYGATE_TOKEN_CREATE_COMPLETE,
	PAYGATE_TOKEN_CREATE_FAIL,
	TRANSACTION_CREATE,
	TRANSACTION_CREATE_COMPLETE,
	TRANSACTION_CREATE_FAIL,
	WPCOM_REQUEST
} from 'reducers/action-types';
import { getCheckout } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import { snakeifyKeys } from 'lib/formatters';
import paygateLoader from 'lib/paygate-loader';

// Module variables
const debug = debugFactory( 'delphin:actions' );

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

export const fetchPaygateConfiguration = () => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	loading: PAYGATE_CONFIGURATION_FETCH,
	params: { path: '/me/paygate-configuration' },
	query: { request_type: 'new_payment' },
	success: configuration => ( {
		type: PAYGATE_CONFIGURATION_FETCH_COMPLETE,
		configuration
	} ),
	fail: error => ( {
		type: PAYGATE_CONFIGURATION_FETCH_FAIL,
		error
	} )
} );

function requestPaygateToken( configuration, cardDetails ) {
	return new Promise( ( resolve, reject ) => {
		paygateLoader.ready( configuration.jsUrl, function( error, Paygate ) {
			if ( error ) {
				return reject( error );
			}

			Paygate.setProcessor( configuration.processor );
			Paygate.setApiUrl( configuration.apiUrl );
			Paygate.setPublicKey( configuration.publicKey );
			Paygate.setEnvironment( configuration.environment );

			Paygate.createToken( getPaygateParameters( cardDetails ), data => data.is_error
					? reject( new Error( 'Paygate Response Error: ' + data.error_msg ) )
					: resolve( data.token ),
				() => reject( new Error( 'Paygate Request Error' ) ) );
		} );
	} );
}

export const createPaygateToken = () => ( dispatch, getState ) => {
	const { configuration } = getCheckout( getState() ).paygateConfiguration.data,
		checkoutForm = getValues( getState().form.checkout ),
		cardDetails = {
			name: checkoutForm.name,
			number: checkoutForm.number,
			cvv: checkoutForm.cvv,
			expirationDate: checkoutForm.expirationMonth + checkoutForm.expirationYear,
			postalCode: null // TODO: do we need these values?
		};

	dispatch( { type: PAYGATE_TOKEN_CREATE } );
	return requestPaygateToken( configuration, cardDetails )
		.then( token => dispatch( { type: PAYGATE_TOKEN_CREATE_COMPLETE, token } ) )
		.catch( error => {
			dispatch( { type: PAYGATE_TOKEN_CREATE_FAIL, error } );
			return Promise.reject( error );
		} );
};

export function createTransaction() {
	return ( dispatch, getState ) => {
		const user = getUserSettings( getState() ),
			checkout = getCheckout( getState() ),
			{ domain } = checkout.selectedDomain,
			{ blogId } = checkout.site.data,
			contactInformationForm = getValues( getState().form.contactInformation ),
			paygateToken = checkout.paygateToken.data.token;

		const payload = {
			bearer_token: user.data.bearerToken,
			payment_key: paygateToken,
			payment_method: 'WPCOM_Billing_MoneyPress_Paygate',
			locale: 'en',
			cart: {
				blog_id: blogId,
				currency: 'GBP',
				temporary: 1,
				extra: {},
				products: [
					{
						product_id: 74,
						meta: domain,
						volume: 1,
						free_trial: false
					}
				]
			},
			domain_details: snakeifyKeys( contactInformationForm )
		};

		return dispatch( {
			type: WPCOM_REQUEST,
			method: 'post',
			params: { path: '/me/transactions' },
			payload,
			loading: TRANSACTION_CREATE,
			success: ( data ) => {
				debug( data );
				return createTransactionComplete( blogId, domain );
			},
			fail: ( error ) => {
				dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );

				return {
					type: TRANSACTION_CREATE_FAIL,
					error: error
				};
			}
		} );
	};
}

export function createTransactionComplete( blogId, domain ) {
	return {
		type: TRANSACTION_CREATE_COMPLETE,
		blogId,
		domain
	};
}

export const purchaseDomain = () => dispatch => {
	dispatch( () => dispatch( fetchPaygateConfiguration() ) )
		.then( () => dispatch( createPaygateToken() ) )
		.then( () => dispatch( createTransaction() ) );
};
