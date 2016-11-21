// External dependencies
import i18n from 'i18n-calypso';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	MY_DOMAINS_FETCH,
	MY_DOMAINS_FETCH_COMPLETE,
	MY_DOMAINS_FETCH_FAIL,
	DOMAIN_UPDATE_COMPLETE,
	DOMAIN_UPDATE_FAIL,
	DOMAIN_UPDATE_POST,
	WPCOM_REQUEST
} from 'reducers/action-types';
import { snakeifyKeys } from 'lib/formatters';

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

export const updateDomain = ( domain, serviceSlug, hostName = '' ) => ( {
	type: WPCOM_REQUEST,
	method: 'post',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/domain/' + domain
	},
	payload: snakeifyKeys( {
		serviceSlug,
		hostName,
	} ),
	loading: DOMAIN_UPDATE_POST,
	success: results => ( {
		type: DOMAIN_UPDATE_COMPLETE,
		results
	} ),
	fail: error => dispatch => {
		dispatch( {
			type: DOMAIN_UPDATE_FAIL,
			error
		} );

		dispatch( addNotice( {
			message: error.message,
			status: 'error'
		} ) );

		return Promise.reject( error );
	}
} );

export const resetDomain = domain => dispatch => (
	dispatch( updateDomain( domain, 'sawbuck' ) )
		.then( () => {
			dispatch( addNotice( {
				status: 'success',
				message: i18n.translate( 'Your domain has been reset to the default settings.' )
			} ) );

			dispatch( fetchMyDomains() );
		} )
		.catch( () => (
			dispatch( addNotice( {
				status: 'error',
				message: i18n.translate( 'There was an error when resetting your domain.' )
			} ) )
		) )
);
