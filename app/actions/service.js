// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	SERVICE_FETCH,
	SERVICE_FETCH_COMPLETE,
	SERVICE_FETCH_FAIL,
	WPCOM_REQUEST,
} from 'reducers/action-types';

export const fetchService = domain => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/service/' + domain
	},
	loading: { type: SERVICE_FETCH, domain },
	success: ( { service } ) => ( {
		type: SERVICE_FETCH_COMPLETE,
		domain,
		service
	} ),
	fail: error => dispatch => {
		dispatch( {
			type: SERVICE_FETCH_FAIL,
			domain
		} );

		dispatch( addNotice( {
			message: error.message,
			status: 'error'
		} ) );
	}
} );
