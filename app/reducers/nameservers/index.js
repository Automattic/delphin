// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	NAMESERVERS_UPDATE,
	NAMESERVERS_UPDATE_COMPLETE,
	NAMESERVERS_UPDATE_FAIL,
} from 'reducers/action-types';

const reducer = createRequestReducer( {
	loading: NAMESERVERS_UPDATE,
	success: NAMESERVERS_UPDATE_COMPLETE,
	fail: NAMESERVERS_UPDATE_FAIL,
} );

export default reducer;
