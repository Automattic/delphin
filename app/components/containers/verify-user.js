// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import VerifyUser from 'components/ui/verify-user';

export default reduxForm(
	{
		form: 'verify-user',
		fields: [ 'code' ]
	}
)( VerifyUser );
