// External dependencies
import { bindActionCreators } from 'redux';
import { change, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { connectUser, connectUserComplete, verifyUser } from 'actions/user';
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

const getUserDataFromQuery = query => {
	if ( ! query.intention || ! query.email ) {
		return;
	}

	return {
		code: query.code,
		intention: query.intention,
		email: query.email,
		twoFactorAuthenticationEnabled: !! query[ '2fa' ]
	};
};

export default reduxForm(
	{
		form: 'verifyUser',
		fields: [ 'code', 'twoFactorAuthenticationCode' ],
		asyncValidate: getAsyncValidateFunction( validate ),
		asyncBlurFields: [ 'code', 'twoFactorAuthenticationCode' ],
	},
	( state, ownProps ) => ( {
		domain: getCheckout( state ).selectedDomain.domain,
		isLoggedIn: isLoggedIn( state ),
		user: getUserConnect( state ),
		userDataFromQuery: getUserDataFromQuery( ownProps.location.query )
	} ),
	dispatch => bindActionCreators( {
		addNotice,
		connectUser,
		connectUserComplete,
		redirect: pathSlug => push( getPath( pathSlug ) ),
		updateCode: code => change( 'verifyUser', 'code', code ),
		verifyUser
	}, dispatch )
)( VerifyUser );
