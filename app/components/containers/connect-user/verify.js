// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { connectUser, verifyUser } from 'actions/user';
import { getPath } from 'routes';
import { getUserConnect, isLoggedIn } from 'reducers/user/selectors';
import i18n from 'i18n-calypso';
import VerifyUser from 'components/ui/connect-user/verify-user';

const validate = values => {
	const errors = {};
	if ( ! values.code ) {
		errors.code = i18n.translate( 'Please enter your verification code' );
	} else if ( ! /^[0-9]{6}$/i.test( values.code ) ) {
		errors.code = i18n.translate( 'This is an invalid verification code' );
	}

	if ( values.twoFactorAuthenticationCode !== undefined ) {
		if ( ! values.twoFactorAuthenticationCode ) {
			errors.twoFactorAuthenticationCode = i18n.translate( 'Please enter your two factor authentication code' );
		} else if ( ! /^[0-9]{6}$/i.test( values.twoFactorAuthenticationCode ) ) {
			errors.twoFactorAuthenticationCode = i18n.translate( 'This is an invalid two factor authentication code' );
		}
	}

	return errors;
};

export default reduxForm(
	{
		form: 'verify-user',
		fields: [ 'code', 'twoFactorAuthenticationCode' ],
		validate
	},
	state => ( {
		isLoggedIn: isLoggedIn( state ),
		user: getUserConnect( state )
	} ),
	dispatch => ( {
		connectUser( email, intention, callback ) {
			return dispatch( connectUser( email, intention, callback ) );
		},
		redirectToSignup() {
			dispatch( push( getPath( 'signupUser' ) ) );
		},
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		},
		verifyUser( email, code, twoFactorAuthenticationCode ) {
			return dispatch( verifyUser( email, code, twoFactorAuthenticationCode ) );
		}
	} )
)( VerifyUser );
