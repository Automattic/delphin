// External dependencies
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from './require-login';
import ConnectOther from 'components/ui/set-up-connect/other';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'set-up-connect-other',
		fields: [ 'providerText' ]
	},
	undefined,
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( ConnectOther ) );
