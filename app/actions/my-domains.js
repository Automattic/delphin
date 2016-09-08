// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	MY_DOMAINS_FETCH,
	MY_DOMAINS_FETCH_COMPLETE,
	MY_DOMAINS_FETCH_FAIL,
	WPCOM_REQUEST
} from 'reducers/action-types';

/**
 * Fetches the user domains.
 *
 * @returns {object} the corresponding action object
 */
export const fetchMyDomains = () => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/purchases'
	},
	loading: MY_DOMAINS_FETCH,
	success: results => dispatch => dispatch( {
		type: MY_DOMAINS_FETCH_COMPLETE,
		results
	} ),
	fail: error => dispatch => {
		dispatch( {
			type: MY_DOMAINS_FETCH_FAIL,
			error
		} );

		dispatch( addNotice( {
			message: error.message,
			status: 'error'
		} ) );
	}
} );
