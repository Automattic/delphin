// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { contactInformation } from './contact-information';
import domainSearch from './domain-search';
import languagePicker from './language-picker';
import myDomains from './my-domains';
import confirmDomain from './confirm-domain';

export default combineReducers( {
	confirmDomain,
	contactInformation,
	domainSearch,
	languagePicker,
	myDomains,
} );
