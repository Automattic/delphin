// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	MY_DOMAINS_FETCH,
	MY_DOMAINS_FETCH_COMPLETE,
	MY_DOMAINS_FETCH_FAIL,
	UPDATE_DOMAIN_COMPLETE,
	UPDATE_DOMAIN_FAIL,
	UPDATE_DOMAIN_POST,
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
		path: '/delphin/domains'
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

export const updateDomain = ( domain, service ) => ( {
	type: WPCOM_REQUEST,
	method: 'post',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/domain/' + domain
	},
	payload: {
		service_slug: service
	},
	loading: UPDATE_DOMAIN_POST,
	success: results => dispatch => dispatch( {
		type: UPDATE_DOMAIN_COMPLETE,
		results
	} ),
	fail: error => dispatch => {
		dispatch( {
			type: UPDATE_DOMAIN_FAIL,
			error
		} );

		dispatch( addNotice( {
			message: error.message,
			status: 'error'
		} ) );
	}
} );
