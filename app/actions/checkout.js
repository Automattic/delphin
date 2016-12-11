// External dependencies
import { card } from 'creditcards';
import { getValues } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CHECKOUT_REQUESTS_RESET,
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
import { snakeifyKeys } from 'lib/formatters';
import paygateLoader from 'lib/paygate-loader';

export const resetCheckout = () => ( { type: CHECKOUT_REQUESTS_RESET } );

function getPaygateParameters( cardDetails ) {
	return {
		name: cardDetails.name,
		number: cardDetails.number,
		cvc: cardDetails.cvv,
		zip: cardDetails.postalCode,
		country: cardDetails.countryCode,
		exp_month: cardDetails.expirationDate.substring( 0, 2 ),
		exp_year: '20' + cardDetails.expirationDate.substring( 2, 4 )
	};
}

export const fetchPaygateConfiguration = () => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	loading: PAYGATE_CONFIGURATION_FETCH,
	params: { path: '/me/paygate-configuration' },
	query: {
		request_type: 'new_payment',
		client_app: 'delphin'
	},
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
			number: card.parse( checkoutForm.number ),
			cvv: checkoutForm.cvv,
			expirationDate: checkoutForm.expirationMonth + checkoutForm.expirationYear,
			countryCode: checkoutForm.countryCode,
			postalCode: checkoutForm.postalCode
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
		const state = getState();

		const checkout = getCheckout( state ),
			{ domainName } = checkout.selectedDomain,
			contactInformationForm = getValues( state.form.contactInformation ),
			checkoutForm = getValues( state.form.checkout ),
			{ privacyProtection } = checkoutForm,
			paygateToken = checkout.paygateToken.data.token;

		const payload = {
			domain: domainName,
			privacy: privacyProtection,
			payment_key: paygateToken,
			payment_method: 'paygate',
			contact_information: snakeifyKeys( contactInformationForm )
		};

		return dispatch( {
			type: WPCOM_REQUEST,
			method: 'post',
			params: {
				apiNamespace: 'wpcom/v2',
				path: '/delphin/transactions'
			},
			payload,
			loading: TRANSACTION_CREATE,
			success: ( { receiptId } ) => ( {
				type: TRANSACTION_CREATE_COMPLETE,
				domain: checkout.selectedDomain,
				receiptId
			} ),
			fail: ( error ) => failThunkDispatch => {
				// we may catch an error thrown by an analytics client here,
				// use error.toString in case a non-Error object is thrown
				failThunkDispatch( addNotice( {
					message: error.message || error.toString(),
					status: 'error'
				} ) );

				failThunkDispatch( {
					type: TRANSACTION_CREATE_FAIL,
					error: error
				} );

				// we don't want swallow the error
				return Promise.reject( error );
			}
		} );
	};
}

export const purchaseDomain = () => dispatch =>
	dispatch( () => dispatch( fetchPaygateConfiguration() ) )
		.then( () => dispatch( createPaygateToken() ) )
		.then( () => dispatch( createTransaction() ) );

