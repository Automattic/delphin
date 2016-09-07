// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	WPCOM_REQUEST,
	DOMAIN_PRICE_FETCH,
	DOMAIN_PRICE_FETCH_COMPLETE,
	DOMAIN_PRICE_FETCH_FAIL
} from 'reducers/action-types';
import { withTld } from 'lib/domains';

const normalizeQuery = query => query.trim().toLowerCase();

export function fetchDomainPrice( domainQuery = '' ) {
	const queryWithTld = withTld( normalizeQuery( domainQuery ) );

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
			result: result,
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
