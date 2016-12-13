// External dependencies
import { reducer as form } from 'redux-form';

// Internal dependencies
import { checkout } from './checkout';
import { contactInformation } from './contact-information';
import { contactSupport } from './contact-support';
import territories from './territories';
import { domainAvailability } from './domain-availability';
import { domainSearch } from './domain-search';
import nameservers from './nameservers';
import { notices } from './notices';
import { prices } from './prices';
import { service } from './service';
import ui from './ui';
import { user } from './user';

import { formNormalizers as nameserversNormalizers } from 'components/containers/set-up-domain/update-nameservers';

const formsNormalizersMap = {
	nameservers: nameserversNormalizers
};

export default {
	checkout,
	contactInformation,
	contactSupport,
	domainAvailability,
	domainSearch,
	form: form.normalize( formsNormalizersMap ),
	nameservers,
	notices,
	prices,
	service,
	territories,
	ui,
	user
};
