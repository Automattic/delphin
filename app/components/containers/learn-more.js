// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import LearnMore from 'components/ui/learn-more';

export default reduxForm(
	{
		form: 'learn-more',
		fields: [ 'domain', 'email' ],
	}
)( LearnMore );
