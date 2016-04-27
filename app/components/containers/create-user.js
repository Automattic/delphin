// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import CreateUser from 'components/ui/create-user';

export default reduxForm(
	{
		form: 'create-user',
		fields: [ 'email' ]
	}
)( CreateUser );
