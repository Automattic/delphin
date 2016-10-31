// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	NAMESERVERS_UPDATE,
	NAMESERVERS_UPDATE_COMPLETE,
	NAMESERVERS_UPDATE_FAIL,
	NAMESERVERS_FETCH,
	NAMESERVERS_FETCH_COMPLETE,
	NAMESERVERS_FETCH_FAIL,
} from 'reducers/action-types';

const reducer = createRequestReducer( {
	loading: [ NAMESERVERS_FETCH, NAMESERVERS_UPDATE ],
	success: [ NAMESERVERS_FETCH_COMPLETE, NAMESERVERS_UPDATE_COMPLETE ],
	fail: [ NAMESERVERS_FETCH_FAIL, NAMESERVERS_UPDATE_FAIL ],
} );

export default reducer;
