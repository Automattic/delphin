// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	WPCOM_REQUEST,
	DOMAIN_PRICE_CLEAR,
	DOMAIN_PRICE_FETCH,
	DOMAIN_PRICE_FETCH_COMPLETE,
	DOMAIN_PRICE_FETCH_FAIL
} from 'reducers/action-types';
import { withTld } from 'lib/domains';

/**
 * Returns an action object to be used in signalling that domain PRICE have been cleared.
 *
 * @returns {Object} the corresponding action object
 */
export function clearDomainPrice() {
	return {
		type: DOMAIN_PRICE_CLEAR
	};
}

export function fetchDomainPrice( domainQuery = '' ) {
	if ( domainQuery.trim() === '' ) {
		return clearDomainPrice();
	}

	const queryWithTld = withTld( domainQuery );

	return {
		type: WPCOM_REQUEST,
		method: 'get',
		params: {
			apiNamespace: 'wpcom/v2',
			path: '/delphin/domains/price'
		},
		query: {
			query: queryWithTld
		},
		loading: () => ( { type: DOMAIN_PRICE_FETCH, query: domainQuery } ),
		success: ( result ) => ( {
			type: DOMAIN_PRICE_FETCH_COMPLETE,
			result,
			query: domainQuery
		} ),
		fail: ( error ) => {
			return dispatch => {
				dispatch( {
					type: DOMAIN_PRICE_FETCH_FAIL
				} );
				dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );
			};
		}
	};
}
