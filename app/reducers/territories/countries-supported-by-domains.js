// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH,
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_COMPLETE,
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_ERROR,
} from 'reducers/action-types';

export const countriesSupportedByDomains = createRequestReducer( {
	loading: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH,
	success: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_COMPLETE,
	fail: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_ERROR
} );
