// Internal dependencies
import { createRequestReducer, initialState } from 'lib/create-request-reducer';
import {
	DOMAIN_PRICE_CLEAR,
	DOMAIN_PRICE_FETCH,
	DOMAIN_PRICE_FETCH_COMPLETE,
	DOMAIN_PRICE_FETCH_FAIL,
	DOMAIN_SELECT
} from 'reducers/action-types';

export const domainPrice = createRequestReducer( {
	loading: DOMAIN_PRICE_FETCH,
	success: DOMAIN_PRICE_FETCH_COMPLETE,
	fail: DOMAIN_PRICE_FETCH_FAIL,
	additionalReducer( state, action ) {
		const { type } = action;

		switch ( type ) {
			case DOMAIN_SELECT:
			case DOMAIN_PRICE_CLEAR:
				return initialState;
		}
	}
} );
