// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { createUserWithoutPassword, verifyUser } from 'actions';
import { getPath } from 'routes';
import i18n from 'lib/i18n';
import VerifyUser from 'components/ui/signup/verify-user';

const validate = values => {
	if ( ! values.code ) {
		return { code: i18n.translate( 'Please enter your verification code' ) };
	} else if ( !/[-0-9]{6}$/i.test( values.code ) ) {
		return { code: i18n.translate( 'This is an invalid verification code' ) };
	}
	return {};
};

export default reduxForm(
	{
		form: 'verify-user',
		fields: [ 'code', 'twoFactorAuthenticationCode' ],
		validate
	},
	state => ( {
		user: state.user
	} ),
	dispatch => ( {
		createUserWithoutPassword( email, callback ) {
			return dispatch( createUserWithoutPassword( email, callback ) );
		},
		redirectToNewUser() {
			dispatch( push( getPath( 'createUser' ) ) );
		},
		redirectToSearch() {
			dispatch( push( getPath( 'search' ) ) );
		},
		verifyUser( email, code, twoFactorAuthenticationCode ) {
			return dispatch( verifyUser( email, code, twoFactorAuthenticationCode ) );
		}
	} )
)( VerifyUser );
