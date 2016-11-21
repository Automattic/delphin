// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import ContactConcierge from 'app/components/ui/set-up-domain/contact-concierge/index.js';
import { contactSupport } from 'actions/contact-support';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		fields: [ 'message' ],
		form: 'contactConcierge'
	},
	( state, { params: { domainName, hostName } } ) => ( {
		domainName,
		hostName,
	} ),
	{
		addNotice,
		contactSupport,
		redirect,
	}
)( ContactConcierge );
