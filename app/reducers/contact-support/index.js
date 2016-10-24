// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	SUPPORT_CONTACT,
	SUPPORT_CONTACT_COMPLETE,
	SUPPORT_CONTACT_FAIL,
} from 'reducers/action-types';

export const contactSupport = createRequestReducer( {
	loading: SUPPORT_CONTACT,
	success: SUPPORT_CONTACT_COMPLETE,
	fail: SUPPORT_CONTACT_FAIL
} );
