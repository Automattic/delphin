// External dependencies
import { getValues, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from 'components/containers/require-login';
import selectNewBlogNeeds from 'components/ui/set-up-domain/select-new-blog-needs';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'selectNewBlogNeeds',
		fields: [ 'needs' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasAnsweredPreviousQuestion: !! getValues( state.form.selectBlogType ),
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( selectNewBlogNeeds ) );
