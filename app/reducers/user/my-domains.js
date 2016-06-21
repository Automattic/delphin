// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	MY_DOMAINS_FETCH,
	MY_DOMAINS_FETCH_COMPLETE,
	MY_DOMAINS_FETCH_FAIL
} from 'reducers/action-types';

export const myDomains = createRequestReducer( {
	loading: MY_DOMAINS_FETCH,
	success: MY_DOMAINS_FETCH_COMPLETE,
	fail: MY_DOMAINS_FETCH_FAIL
} );
