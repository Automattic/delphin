// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { contactInformation } from './contact-information';
import domainSearch from './domain-search';
import languagePicker from './language-picker';
import myDomains from './my-domains';

export default combineReducers( {
	contactInformation,
	domainSearch,
	languagePicker,
	myDomains
} );
