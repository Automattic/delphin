// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import validator from 'validator';

// Internal dependencies
import { addNotice } from 'actions/notices';
import ConnectUser from 'components/ui/connect-user';
import { getAsyncValidateFunction } from 'lib/form';
import { getSelectedDomain } from 'reducers/checkout/selectors';
import { getUserConnect, isLoggedIn } from 'reducers/user/selectors';
import { clearConnectUser, connectUser } from 'actions/user';
import { redirect } from 'actions/routes';
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
		initialValues: { email: getUserConnect( state ).data.email || '' },
		isLoggedIn: isLoggedIn( state ),
		user: getUserConnect( state )
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		clearConnectUser,
		displayError: ( errorMessage ) => addNotice( {
			message: errorMessage,
			status: 'error'
		} ),
		connectUser: withAnalytics(
			recordTracksEvent( 'delphin_signup_submit' ),
			( fields, domain ) => connectUser( fields.email, ownProps.intention, domain )
		),
		redirectToHome: () => redirect( 'home' ),
		redirectToVerifyUser: () => {
			const { location: { query } } = ownProps,
				// omit the query params entirely if empty to prevent an empty
				// `?redirect_to=` at the end of the URL
				queryParams = query.redirect_to ? { redirect_to: query.redirect_to } : undefined;

			return redirect( 'verifyUser', { queryParams } );
		}
	}, dispatch )
)( ConnectUser );
