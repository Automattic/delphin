// Internal dependencies
import {
	PRICES_FETCH,
	PRICES_FETCH_COMPLETE,
	PRICES_FETCH_FAIL,
} from 'reducers/action-types';
import { createRequestReducer } from 'lib/create-request-reducer';

export const prices = createRequestReducer( {
	loading: PRICES_FETCH,
	success: PRICES_FETCH_COMPLETE,
	fail: PRICES_FETCH_FAIL
} );
