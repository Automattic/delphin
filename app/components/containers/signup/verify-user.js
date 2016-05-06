// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getPath } from 'routes';
import { createUserWithoutPassword, verifyUser } from 'actions';
import VerifyUser from 'components/ui/signup/verify-user';

export default reduxForm(
	{
		form: 'verify-user',
		fields: [ 'code', 'twoFactorAuthenticationCode' ]
	},
	state => ( {
		user: state.user
	} ),
	dispatch => ( {
		createUserWithoutPassword( email, callback ) {
			dispatch( createUserWithoutPassword( email, callback ) );
		},
		redirectToNewUser() {
			dispatch( push( getPath( 'createUser' ) ) );
		},
		redirectToSearch() {
			dispatch( push( getPath( 'search' ) ) );
		},
		verifyUser( email, code, twoFactorAuthenticationCode ) {
			dispatch( verifyUser( email, code, twoFactorAuthenticationCode ) );
		}
	} )
)( VerifyUser );
