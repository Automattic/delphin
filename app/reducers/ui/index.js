// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { contactInformation } from './contact-information';
import domainSearch from './domain-search';
import isSectionLoading from './is-section-loading';
import languagePicker from './language-picker';
import toggle from './toggle';

export default combineReducers( {
	contactInformation,
	domainSearch,
	isSectionLoading,
	languagePicker,
	toggle
} );
