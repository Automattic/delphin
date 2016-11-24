// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import ContactConcierge from 'app/components/ui/set-up-domain/contact-concierge/index.js';
import { contactSupport } from 'actions/contact-support';
import { isContactingSupport } from 'reducers/contact-support/selectors';
import { recordTracksEvent } from 'actions/analytics';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		fields: [ 'message' ],
		form: 'contactConcierge'
	},
	( state, { params: { domainName, hostName } } ) => ( {
		domainName,
		hostName,
		isContactingSupport: isContactingSupport( state ),
	} ),
	{
		addNotice,
		contactSupport,
		redirect,
		recordTracksEvent,
	}
)( ContactConcierge );
