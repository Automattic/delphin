// External dependencies
import { getValues, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from './require-login';
import SetUpConnectOther from 'components/ui/set-up-connect/other';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'setUpConnectOther',
		fields: [ 'providerText' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasAnsweredPreviousQuestion: !! getValues( state.form.setUpNewBlog ),
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( SetUpConnectOther ) );
