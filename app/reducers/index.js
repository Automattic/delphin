// External dependencies
import { reducer as form } from 'redux-form';

// Internal dependencies
import { checkout } from './checkout';
import { contactInformation } from './contact-information';
import { contactSupport } from './contact-support';
import territories from './territories';
import { domainAvailability } from './domain-availability';
import { domainSuggestions } from './domain-suggestions';
import nameservers from './nameservers';
import { notices } from './notices';
import { prices } from './prices';
import { service } from './service';
import ui from './ui';
import { user } from './user';

export default {
	checkout,
	contactInformation,
	contactSupport,
	domainAvailability,
	domainSuggestions,
	form,
	nameservers,
	notices,
	prices,
	service,
	territories,
	ui,
	user
};
