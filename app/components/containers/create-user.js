// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import CreateUser from 'components/ui/create-user';
import { createUserWithoutPassword } from 'actions';
import { getPath } from 'routes';

export default reduxForm(
	{
		form: 'create-user',
		fields: [ 'email' ],
		onSubmit( form, dispatch ) {
			dispatch( createUserWithoutPassword( form.email ) );
		}
	},
	state => ( {
		user: state.user
	} ),
	dispatch => ( {
		redirectToVerifyUser() {
			dispatch( push( getPath( 'verifyUser' ) ) );
		}
	} )
)( CreateUser );
