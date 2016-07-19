// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import TrademarkVerification from 'components/ui/trademark-verification';

export default reduxForm(
	{
		form: 'trademarkVerification',
		fields: [ 'smd' ]
	}
)( TrademarkVerification );
