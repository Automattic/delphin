// External dependencies
import { getValues, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from 'components/containers/require-login';
import SelectNewBlogHost from 'components/ui/set-up-domain/select-new-blog-host';
import { redirect } from 'actions/routes';
import { updateDomain } from 'actions/my-domains';

export default reduxForm(
	{
		form: 'selectNewBlogHost',
		fields: [ 'service' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasAnsweredPreviousQuestion: !! getValues( state.form.selectBlogType ),
	} ),
	dispatch => bindActionCreators( {
		redirect,
		updateDomain
	}, dispatch )
)( RequireLogin( SelectNewBlogHost ) );
