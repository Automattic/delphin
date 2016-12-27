export const getDomainSearch = state => state.ui.domainSearch;
export const getKeywords = state => getDomainSearch( state ).domainKeywords.keywords;
export const getInputValue = state => getDomainSearch( state ).domainKeywords.inputValue;
