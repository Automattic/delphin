// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import domainKeywords from './domain-keywords';
import relatedWords from './related-words';
import showEmptySearchNotice from './show-empty-search-notice';

export default combineReducers( {
	domainKeywords,
	relatedWords,
	showEmptySearchNotice
} );
