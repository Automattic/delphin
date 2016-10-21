// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import ContactUsExistingBlog from 'components/ui/set-up-domain/contact-us-existing-blog';
import { contactSupport } from 'actions/contact-support';
import { isContactingSupport } from 'reducers/contact-support/selectors';

export default reduxForm(
	{
		fields: [ 'message' ],
		form: 'contactUsExistingBlog'
	},
	( state, { params: { domainName, hostName } } ) => ( {
		domainName,
		hostName,
		isContactingSupport: isContactingSupport( state ),
	} ),
	dispatch => bindActionCreators( {
		contactSupport,
	}, dispatch )
)( ContactUsExistingBlog );
