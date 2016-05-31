// External dependencies
import find from 'lodash/find';

export const getDomainSearch = state => state.ui.domainSearch;
export const getSelectedKeyword = state => find( getDomainSearch( state ).keywords, keyword => keyword.isSelected );
export const getKeywords = state => getDomainSearch( state ).keywords;
export const getInputValue = state => getDomainSearch( state ).inputValue;
export const getRelatedWords = state => getDomainSearch( state ).relatedWords;
