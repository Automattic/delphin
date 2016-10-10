// External dependencies
import { getValues, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from './require-login';
import SetUpNewBlog from 'components/ui/set-up-new-blog';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'setUpNewBlog',
		fields: [ 'wordpressOrOther' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasAnsweredPreviousQuestion: !! getValues( state.form.selectBlogType ),
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( SetUpNewBlog ) );
