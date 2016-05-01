// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import CreateUser from 'components/ui/signup/create-user';
import { removeUser, createUserWithoutPassword } from 'actions';
import { getPath } from 'routes';

const validate = values => {
	const errors = {};
	if ( ! values.email ) {
		errors.email = 'Required';
	} else if ( ! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( values.email ) ) {
		errors.email = 'Invalid email address';
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
	( dispatch, props ) => ( {
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
