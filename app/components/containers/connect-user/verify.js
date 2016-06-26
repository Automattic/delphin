// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import { startSubmit, stopSubmit } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { connectUser, verifyUser } from 'actions/user';
import { getAsyncValidateFunction } from 'lib/form';
import { getCheckout } from 'reducers/checkout/selectors';
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
		} else if ( ! /^[0-9]{6,7}$/i.test( values.twoFactorAuthenticationCode ) ) {
			errors.twoFactorAuthenticationCode = i18n.translate( 'This is an invalid two factor authentication code' );
		}
	}

	return errors;
};

export default reduxForm(
	{
		form: 'verifyUser',
		fields: [ 'code', 'twoFactorAuthenticationCode' ],
		asyncValidate: getAsyncValidateFunction( validate ),
		asyncBlurFields: [ 'code', 'twoFactorAuthenticationCode' ],
	},
	state => ( {
		domain: getCheckout( state ).selectedDomain.domain,
		isLoggedIn: isLoggedIn( state ),
		user: getUserConnect( state )
	} ),
	dispatch => bindActionCreators( {
		connectUser,
		redirect: pathSlug => push( getPath( pathSlug ) ),
		verifyUser: ( email, code, twoFactorAuthenticationCode, intention ) => {
			return innerDispatch => {
				innerDispatch( startSubmit( 'verifyUser' ) );

				innerDispatch( verifyUser( email, code, twoFactorAuthenticationCode ) ).then( () => {
					innerDispatch( stopSubmit( 'verifyUser' ) );

					if ( intention === 'login' ) {
						innerDispatch( addNotice( {
							message: i18n.translate( 'You were successfully logged in!' ),
							status: 'success'
						} ) );
					}
				} );
			};
		}
	}, dispatch )
)( VerifyUser );
