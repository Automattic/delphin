// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import CreateUser from 'components/ui/create-user';
import { removeUser, createUserWithoutPassword } from 'actions';
import { getPath } from 'routes';

export default reduxForm(
	{
		form: 'create-user',
		fields: [ 'email' ],
		onSubmit( fields, dispatch ) {
			dispatch( createUserWithoutPassword( fields.email ) );
		}
	},
	state => ( {
		user: state.user
	} ),
	dispatch => ( {
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
