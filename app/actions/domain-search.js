// Internal dependencies
import {
	DOMAIN_SEARCH_CLEAR,
	DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
	DOMAIN_SEARCH_SUBMIT,
	DOMAIN_SELECT,
} from 'reducers/action-types';

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
