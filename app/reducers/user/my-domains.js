// Internal dependencies
import { createRequestReducer, initialState } from 'lib/create-request-reducer';
import {
	LOGOUT_USER,
	MY_DOMAINS_FETCH,
	MY_DOMAINS_FETCH_COMPLETE,
	MY_DOMAINS_FETCH_FAIL
} from 'reducers/action-types';

export const myDomains = createRequestReducer( {
	loading: MY_DOMAINS_FETCH,
	success: MY_DOMAINS_FETCH_COMPLETE,
	fail: MY_DOMAINS_FETCH_FAIL
}, ( state, action ) => {
	const { type } = action;

	switch ( type ) {
		case LOGOUT_USER:
		default:
			return initialState;
	}
} );
