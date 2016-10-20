// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	CONTACT_SUPPORT_FETCH,
	CONTACT_SUPPORT_FETCH_COMPLETE,
	CONTACT_SUPPORT_FETCH_FAIL,
} from 'reducers/action-types';

export const contactSupport = createRequestReducer( {
	loading: CONTACT_SUPPORT_FETCH,
	success: CONTACT_SUPPORT_FETCH_COMPLETE,
	fail: CONTACT_SUPPORT_FETCH_FAIL
} );
