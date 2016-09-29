// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import RequireLogin from './require-login';
import SetUpExistingBlog from 'components/ui/set-up-existing-blog';

export default reduxForm(
	{
		form: 'setUpExistingBlog',
		fields: [ 'url' ]
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} )
)( RequireLogin( SetUpExistingBlog ) );
