// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import CreateUser from 'components/ui/create-user';
import { createUserWithoutPassword } from 'actions';

export default reduxForm(
	{
		form: 'create-user',
		fields: [ 'email' ],
		onSubmit( form, dispatch ) {
			dispatch( createUserWithoutPassword( form.email ) );
		}
	}
)( CreateUser );
