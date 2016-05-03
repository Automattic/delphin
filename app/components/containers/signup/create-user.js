// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';
import validator from 'validator';

// Internal dependencies
import CreateUser from 'components/ui/signup/create-user';
import i18n from 'lib/i18n';
import { removeUser, createUserWithoutPassword } from 'actions';
import { getPath } from 'routes';

const validate = values => {
	const errors = {};
	if ( ! values.email ) {
		errors.email = i18n.translate( 'Required' );
	} else if ( ! validator.isEmail( values.email ) ) {
		errors.email = i18n.translate( 'Invalid email address' );
	}

	return errors;
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
			dispatch( createUserWithoutPassword( fields.email ) );
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
