// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import ContactUsExistingBlog from 'components/ui/set-up-domain/contact-us-existing-blog';

export default reduxForm(
	{
		fields: [ 'message' ],
		form: 'contactUsExistingBlog'
	},
	( state, { params: { domainName, hostName } } ) => ( {
		domainName,
		hostName,
	} )
)( ContactUsExistingBlog );
