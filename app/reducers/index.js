// External dependencies
import { reducer as form } from 'redux-form';

// Internal dependencies
import { checkout } from './checkout';
import { contactInformation } from './contact-information';
import { contactSupport } from './contact-support';
import territories from './territories';
import { domainSearch } from './domain-search';
import { notices } from './notices';
import { service } from './service';
import ui from './ui';
import { user } from './user';

export default {
	checkout,
	contactInformation,
	contactSupport,
	domainSearch,
	form,
	notices,
	service,
	territories,
	ui,
	user
};
