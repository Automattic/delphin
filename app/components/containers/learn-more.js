// External dependencies
import { reduxForm, reset } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getAsyncValidateFunction } from 'lib/form';
import { validateDomain } from 'lib/domains';
import { validateEmail } from 'lib/form';
import LearnMore from 'components/ui/learn-more';

const validate = ( values ) => ( {
	domain: validateDomain( values.domain ),
	email: validateEmail( values.email )
} );

export default reduxForm(
	{
		form: 'learnMore',
		fields: [ 'domain', 'email' ],
		asyncValidate: getAsyncValidateFunction( validate )
	},
	undefined,
	{
		addNotice,
		resetForm: dispatch => dispatch( reset( 'learnMore' ) )
	}
)( LearnMore );
