// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	WPCOM_REQUEST,
	DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_KEYWORD_REPLACE_SELECTED,
	DOMAIN_SEARCH_KEYWORD_SELECT,
	DOMAIN_SEARCH_KEYWORD_DESELECT,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_INPUT_FOCUS,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
	DOMAIN_SEARCH_SUBMIT,
	DOMAIN_SELECT,
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
	DOMAIN_SUGGESTIONS_FETCH_FAIL,
	DOMAIN_UNSELECT,
} from 'reducers/action-types';
import { omitTld } from 'lib/domains';

/**
 * Returns an action object to be used in signalling that domain suggestions have been cleared.
 *
 * @returns {Object} the corresponding action object
 */
export function clearDomainSuggestions() {
	return {
		type: DOMAIN_SUGGESTIONS_CLEAR
	};
}

export function fetchDomainSuggestions( domainQuery = '' ) {
	if ( domainQuery.trim() === '' ) {
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

export function unselectDomain() {
	return {
		type: DOMAIN_UNSELECT
	};
}

export function selectKeyword( value ) {
	return {
		type: DOMAIN_SEARCH_KEYWORD_SELECT,
		value
	};
}

export function deselectKeyword() {
	return { type: DOMAIN_SEARCH_KEYWORD_DESELECT };
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

export function domainSearchKeywordRemove( value ) {
	return { type: DOMAIN_SEARCH_KEYWORD_REMOVE, value };
}

export function domainSearchKeywordReplaceSelected( value ) {
	return { type: DOMAIN_SEARCH_KEYWORD_REPLACE_SELECTED, value };
}

export const submitEmptySearch = () => ( { type: DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT } );

export const domainSearchInputFocus = () => ( { type: DOMAIN_SEARCH_INPUT_FOCUS } );
