// External dependencies
import { reducer as form } from 'redux-form';

// Internal dependencies
import { checkout } from './checkout';
import { contactInformation } from './contact-information';
import { countries } from './countries';
import { domainSearch } from './domain-search';
import { notices } from './notices';
import ui from './ui';
import { user } from './user';

export default { checkout, contactInformation, countries, form, domainSearch, notices, ui, user };
