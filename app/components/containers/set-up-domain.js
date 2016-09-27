// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getPath } from 'routes';
import RequireLogin from './require-login';
import SetUpDomain from 'components/ui/set-up-domain';

export default reduxForm(
	{
		form: 'set-up-domain',
		fields: [ 'newOrExisting' ]
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} ),
	dispatch => bindActionCreators( {
		redirectToSetUpExistingBlog: ( domainName ) => push( getPath( 'setUpExistingBlog', { domainName } ) )
	}, dispatch )
)( RequireLogin( SetUpDomain ) );
