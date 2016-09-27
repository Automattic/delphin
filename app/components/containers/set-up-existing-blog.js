// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import RequireLogin from './require-login';
import SetUpExistingBlog from 'components/ui/set-up-existing-blog';

export default reduxForm(
	{
		form: 'set-up-existing-blog',
		fields: [ 'url' ]
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} )
)( RequireLogin( SetUpExistingBlog ) );
