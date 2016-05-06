// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import validator from 'validator';

// Internal dependencies
import CreateUser from 'components/ui/signup/create-user';
import { getPath } from 'routes';
import i18n from 'lib/i18n';
import { removeUser, createUserWithoutPassword } from 'actions';

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
		form: 'create-user',
		fields: [ 'email' ],
		validate
	},
	state => ( {
		user: state.user
	} ),
	( dispatch ) => ( {
		onSubmit( fields ) {
			return dispatch( createUserWithoutPassword( fields.email ) );
		},
		redirectToSearch() {
			dispatch( push( getPath( 'search' ) ) );
		},
		redirectToVerifyUser() {
			dispatch( push( getPath( 'verifyUser' ) ) );
		},
		removeUser() {
			dispatch( removeUser() );
		}
	} )
)( CreateUser );
