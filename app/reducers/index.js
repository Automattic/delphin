// External dependencies
import { reducer as form } from 'redux-form';

// Internal dependencies
import { checkout } from './checkout';
import { contactInformation } from './contact-information';
import { contactSupport } from './contact-support';
import history from './history';
import territories from './territories';
import { domainAvailability } from './domain-availability';
import { domainSearch } from './domain-search';
import nameservers from './nameservers';
import { notices } from './notices';
import { service } from './service';
import ui from './ui';
import { user } from './user';

export default {
	checkout,
	contactInformation,
	contactSupport,
	domainAvailability,
	domainSearch,
	form,
	history,
	nameservers,
	notices,
	service,
	territories,
	ui,
	user
};
