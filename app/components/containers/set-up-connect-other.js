// External dependencies
import { getValues, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from './require-login';
import SetUpConnectOther from 'components/ui/set-up-connect/other';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'set-up-connect-other',
		fields: [ 'providerText' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasAnsweredPreviousQuestion: !! getValues( state.form[ 'set-up-new-blog' ] ),
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( SetUpConnectOther ) );
