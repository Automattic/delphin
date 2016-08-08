// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import validator from 'validator';

// Internal dependencies
import ConnectUser from 'components/ui/connect-user';
import { getAsyncValidateFunction } from 'lib/form';
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { getPath } from 'routes';
import { getUserConnect, isLoggedIn } from 'reducers/user/selectors';
import { clearConnectUser, connectUser } from 'actions/user';
import i18n from 'i18n-calypso';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

const validate = values => {
	if ( ! values.email ) {
		return { email: i18n.translate( 'Enter a working email address, so you can receive our messages.' ) };
	} else if ( ! validator.isEmail( values.email ) ) {
		return { email: i18n.translate( 'Use a working email address, so you can receive our messages.' ) };
	}
	return {};
};

export default reduxForm(
	{
		form: 'connectUser',
		fields: [ 'email' ],
		asyncValidate: getAsyncValidateFunction( validate ),
		asyncBlurFields: [ 'email' ]
	},
	state => ( {
		domain: getSelectedDomain( state ),
		hasSelectedDomain: hasSelectedDomain( state ),
		initialValues: { email: getUserConnect( state ).data.email || '' },
		isLoggedIn: isLoggedIn( state ),
		user: getUserConnect( state )
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		clearConnectUser,
		connectUser: withAnalytics(
			recordTracksEvent( 'delphin_signup_submit' ),
			( fields, domain ) => connectUser( fields.email, ownProps.intention, domain )
		),
		redirectToHome: () => push( getPath( 'home' ) ),
		redirectToVerifyUser: () => push( getPath( 'verifyUser' ) )
	}, dispatch )
)( ConnectUser );
