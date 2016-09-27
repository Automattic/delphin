// External dependencies
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from './require-login';
import NewBlog from 'components/ui/new-blog';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'new-blog',
		fields: [ 'simpleOrAdvanced' ]
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( NewBlog ) );
