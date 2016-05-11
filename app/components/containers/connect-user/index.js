// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import validator from 'validator';

// Internal dependencies
import ConnectUser from 'components/ui/connect-user';
import { getPath } from 'routes';
import i18n from 'lib/i18n';
import { connectUser } from 'actions';

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
		form: 'connect-user',
		fields: [ 'email' ],
		validate
	},
	state => ( {
		user: state.user
	} ),
	( dispatch, ownProps ) => ( {
		onSubmit( fields ) {
			return dispatch( connectUser( fields.email, ownProps.intention ) );
		},
		redirectToHome() {
			dispatch( push( getPath( 'search' ) ) );
		},
		redirectToVerifyUser() {
			dispatch( push( getPath( 'verifyUser' ) ) );
		}
	} )
)( ConnectUser );
