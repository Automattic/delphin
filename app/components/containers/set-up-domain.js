// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getPath } from 'routes';
import RequireLogin from './require-login';
import SetUpDomain from 'components/ui/set-up-domain';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'setUpDomain',
		fields: [ 'newOrExisting' ]
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} ),
	dispatch => bindActionCreators( {
		redirectToSetUpExistingBlog: ( domainName ) => push( getPath( 'setUpExistingBlog', { domainName } ) ),
		redirect
	}, dispatch )
)( RequireLogin( SetUpDomain ) );
