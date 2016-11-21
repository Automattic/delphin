// External dependencies
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import { reduxForm, reset } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getAsyncValidateFunction } from 'lib/form';
import { validateEmail } from 'lib/form';
import LearnMore from 'components/ui/learn-more';

const validate = ( values ) => omitBy( {
	email: validateEmail( values.email )
}, isEmpty );

export default reduxForm(
	{
		form: 'learnMore',
		fields: [ 'email' ],
		asyncValidate: getAsyncValidateFunction( validate )
	},
	undefined,
	{
		addNotice,
		resetForm: dispatch => dispatch( reset( 'learnMore' ) )
	}
)( LearnMore );
