// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getPath } from 'routes';
import { verifyUser } from 'actions';
import VerifyUser from 'components/ui/verify-user';

export default reduxForm(
	{
		form: 'verify-user',
		fields: [ 'code' ]
	},
	state => ( {
		user: state.user
	} ),
	dispatch => ( {
		redirectToNewUser() {
			dispatch( push( getPath( 'createUser' ) ) );
		},
		redirectToSearch() {
			dispatch( push( getPath( 'search' ) ) );
		},
		verifyUser( email, code ) {
			dispatch( verifyUser( email, code ) );
		}
	} )
)( VerifyUser );
