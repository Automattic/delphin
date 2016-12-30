// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	WPCOM_REQUEST,
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
	DOMAIN_SUGGESTIONS_FETCH_FAIL,
} from 'reducers/action-types';
import { containsAlphanumericCharacters, omitTld } from 'lib/domains';

/**
 * Action creator for the action that clears domain suggestions.
 *
 * @returns {Object} the corresponding action object
 */
export const clearDomainSuggestions = () => ( { type: DOMAIN_SUGGESTIONS_CLEAR } );

export const fetchDomainSuggestions = ( domainQuery = '' ) => {
	if ( ! containsAlphanumericCharacters( domainQuery ) ) {
		return clearDomainSuggestions();
	}

	const queryWithoutTlds = domainQuery.split( ' ' ).map( omitTld ).join( ' ' );

	return {
		type: WPCOM_REQUEST,
		method: 'get',
		params: {
			apiNamespace: 'wpcom/v2',
			path: '/delphin/domains/suggestions'
		},
		query: {
			query: queryWithoutTlds,
			quantity: 36
		},
		loading: () => ( { type: DOMAIN_SUGGESTIONS_FETCH, query: domainQuery } ),
		success: ( results ) => ( {
			type: DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
			results,
			query: domainQuery
		} ),
		fail: ( error ) => {
			return dispatch => {
				dispatch( {
					type: DOMAIN_SUGGESTIONS_FETCH_FAIL
				} );
				dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );
			};
		}
	};
};
