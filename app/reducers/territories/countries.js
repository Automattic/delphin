// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	COUNTRIES_FETCH,
	COUNTRIES_FETCH_COMPLETE,
	COUNTRIES_FETCH_ERROR
} from 'reducers/action-types';

export const countries = createRequestReducer( {
	loading: COUNTRIES_FETCH,
	success: COUNTRIES_FETCH_COMPLETE,
	fail: COUNTRIES_FETCH_ERROR
} );
