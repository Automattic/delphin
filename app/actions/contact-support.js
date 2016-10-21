// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CONTACT_SUPPORT_FETCH,
	CONTACT_SUPPORT_FETCH_COMPLETE,
	CONTACT_SUPPORT_FETCH_FAIL,
	WPCOM_REQUEST,
} from 'reducers/action-types';
import { snakeifyKeys } from 'lib/formatters';

export const contactSupport = ( {
	domainName,
	hostName,
	blogType,
	message
} ) => ( {
	type: WPCOM_REQUEST,
	method: 'post',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/contact-support'
	},
	payload: snakeifyKeys( {
		blogType,
		domain: domainName,
		hostName,
		message
	} ),
	loading: { type: CONTACT_SUPPORT_FETCH },
	success: ( {
		type: CONTACT_SUPPORT_FETCH_COMPLETE
	} ),
	fail: error => dispatch => {
		dispatch( {
			type: CONTACT_SUPPORT_FETCH_FAIL,
		} );

		dispatch( addNotice( {
			message: error.message,
			status: 'error'
		} ) );
	}
} );
