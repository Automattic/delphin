// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	SUPPORT_CONTACT,
	SUPPORT_CONTACT_COMPLETE,
	SUPPORT_CONTACT_FAIL,
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
	loading: { type: SUPPORT_CONTACT },
	success: ( {
		type: SUPPORT_CONTACT_COMPLETE
	} ),
	fail: error => dispatch => {
		dispatch( {
			type: SUPPORT_CONTACT_FAIL,
		} );

		dispatch( addNotice( {
			message: error.message,
			status: 'error'
		} ) );
	}
} );
