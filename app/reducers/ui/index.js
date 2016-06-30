// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { contactInformation } from './contact-information';
import domainSearch from './domain-search';
import myDomains from './my-domains';
import page from './page';

export default combineReducers( { contactInformation, domainSearch, myDomains, page } );
