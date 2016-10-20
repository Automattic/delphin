// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import ContactUsExistingBlog from 'components/ui/set-up-domain/contact-us-existing-blog';
import { contactSupport } from 'actions/contact-support';

export default reduxForm(
	{
		fields: [ 'message' ],
		form: 'contactUsExistingBlog'
	},
	( state, { params: { domainName, hostName } } ) => ( {
		domainName,
		hostName,
	} ),
	dispatch => bindActionCreators( {
		contactSupport,
	}, dispatch )
)( ContactUsExistingBlog );
