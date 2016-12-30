// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	WPCOM_REQUEST,
	DOMAIN_SEARCH_CLEAR,
	DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
	DOMAIN_SEARCH_SUBMIT,
	DOMAIN_SELECT,
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
	DOMAIN_SUGGESTIONS_FETCH_FAIL,
} from 'reducers/action-types';
import { containsAlphanumericCharacters, omitTld } from 'lib/domains';

/**
 * Returns an action object to be used in signalling that domain search have been cleared.
 *
 * @returns {Object} the corresponding action object
 */
export function clearDomainSearch() {
	return {
		type: DOMAIN_SEARCH_CLEAR
	};
}

/**
 * Action creator for the action that clears domain suggestions.
 *
 * @returns {Object} the corresponding action object
 */
export const clearDomainSuggestions = () => ( { type: DOMAIN_SUGGESTIONS_CLEAR } );

export function fetchDomainSuggestions( domainQuery = '' ) {
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
}

export function selectDomain( domainProduct ) {
	return {
		type: DOMAIN_SELECT,
		value: domainProduct
	};
}

export function domainSearchInputChange( value ) {
	return {
		type: DOMAIN_SEARCH_INPUT_CHANGE,
		value
	};
}

export function domainSearchSubmit() {
	return { type: DOMAIN_SEARCH_SUBMIT };
}

export function domainSearchLastKeywordRemove() {
	return { type: DOMAIN_SEARCH_LAST_KEYWORD_REMOVE };
}

export function domainSearchKeywordRemove( keyword ) {
	return {
		type: DOMAIN_SEARCH_KEYWORD_REMOVE,
		keyword
	};
}

export const submitEmptySearch = () => ( { type: DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT } );
