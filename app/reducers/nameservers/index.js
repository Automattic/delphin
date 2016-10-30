// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	NAMESERVERS_FETCH,
	NAMESERVERS_FETCH_COMPLETE,
	NAMESERVERS_FETCH_FAIL,
} from 'reducers/action-types';

const reducer = createRequestReducer( {
	loading: NAMESERVERS_FETCH,
	success: NAMESERVERS_FETCH_COMPLETE,
	fail: NAMESERVERS_FETCH_FAIL,
} );

export default reducer;
