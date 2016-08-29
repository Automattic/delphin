// External dependencies
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import { reduxForm, reset } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getAsyncValidateFunction } from 'lib/form';
import { validateDomain } from 'lib/domains';
import { emailValidator } from 'components/ui/form/email';
import LearnMore from 'components/ui/learn-more';

const validate = ( values ) => omitBy( {
	domain: validateDomain( values.domain ),
	email: new RegExp( emailValidator ).test( values.email ) ? null : i18n.translate( 'Enter a valid email.' )
}, isEmpty );

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
