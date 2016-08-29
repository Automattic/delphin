// External dependencies
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import { reduxForm, reset } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getAsyncValidateFunction } from 'lib/form';
import { validateDomain } from 'lib/domains';
import LearnMore from 'components/ui/learn-more';

const validate = ( values ) => omitBy( { domain: validateDomain( values.domain ) }, isEmpty );

export default reduxForm(
	{
		form: 'learn-more',
		fields: [ 'domain', 'email' ],
		asyncValidate: getAsyncValidateFunction( validate )
	},
	undefined,
	{
		addNotice,
		resetForm: dispatch => dispatch( reset( 'learn-more' ) )
	}
)( LearnMore );
