// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import RequireLogin from './require-login';
import SetUpDomain from 'components/ui/set-up-domain';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'setUpDomain',
		fields: [ 'newOrExisting' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( SetUpDomain ) );
