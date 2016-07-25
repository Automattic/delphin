// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	COUNTRIES_SUPPORTED_BY_CHECKOUT_FETCH,
	COUNTRIES_SUPPORTED_BY_CHECKOUT_FETCH_COMPLETE,
	COUNTRIES_SUPPORTED_BY_CHECKOUT_FETCH_ERROR,
} from 'reducers/action-types';

export const countriesSupportedByCheckout = createRequestReducer( {
	loading: COUNTRIES_SUPPORTED_BY_CHECKOUT_FETCH,
	success: COUNTRIES_SUPPORTED_BY_CHECKOUT_FETCH_COMPLETE,
	fail: COUNTRIES_SUPPORTED_BY_CHECKOUT_FETCH_ERROR
} );
