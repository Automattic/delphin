// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import validator from 'validator';

// Internal dependencies
import ConnectUser from 'components/ui/connect-user';
import { getAsyncValidateFunction } from 'lib/form';
import { getSelectedDomain } from 'reducers/checkout/selectors';
import { getPath } from 'routes';
import { getUserConnect, isLoggedIn } from 'reducers/user/selectors';
import { clearConnectUser, connectUser } from 'actions/user';
import i18n from 'i18n-calypso';

const validate = values => {
	if ( ! values.email ) {
		return { email: i18n.translate( 'Please enter an email address' ) };
	} else if ( ! validator.isEmail( values.email ) ) {
		return { email: i18n.translate( 'This is an invalid email address' ) };
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
	( dispatch, ownProps ) => ( {
		clearConnectUser() {
			dispatch( clearConnectUser() );
		},
		connectUser( fields, domain ) {
			dispatch( connectUser( fields.email, ownProps.intention, domain ) );
		},
		recordPageView() {
			ownProps.recordPageView();
		},
		redirectToHome() {
			dispatch( push( getPath( 'search' ) ) );
		},
		redirectToVerifyUser() {
			dispatch( push( getPath( 'verifyUser' ) ) );
		}
	} )
)( ConnectUser );
