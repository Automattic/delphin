// External dependencies
import { bindActionCreators } from 'redux';
import { change, reduxForm } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { connectUser, connectUserComplete, verifyUser } from 'actions/user';
import { getAsyncValidateFunction } from 'lib/form';
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { getUserConnect, isLoggedIn } from 'reducers/user/selectors';
import { redirect } from 'actions/routes';
import { selectDomain } from 'actions/domain-search';
import i18n from 'i18n-calypso';
import VerifyUser from 'components/ui/connect-user/verify-user';

const validate = values => {
	const errors = {};
	if ( ! values.code ) {
		errors.code = i18n.translate( 'Please enter your verification code' );
	} else if ( ! /^[0-9]{6}$/i.test( values.code ) ) {
		errors.code = i18n.translate( 'Your code should be six digits' );
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
	( state, ownProps ) => ( {
		hasSelectedDomain: hasSelectedDomain( state ),
		domain: getSelectedDomain( state ),
		isLoggedIn: isLoggedIn( state ),
		user: getUserConnect( state ),
		query: ownProps.location.query
	} ),
	dispatch => bindActionCreators( {
		addNotice,
		connectUser,
		connectUserComplete,
		redirect,
		selectDomain,
		updateCode: code => change( 'verifyUser', 'code', code ),
		verifyUser
	}, dispatch )
)( VerifyUser );
