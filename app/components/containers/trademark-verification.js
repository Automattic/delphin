// External dependencies
import { change, reduxForm } from 'redux-form';

// Internal dependencies
import TrademarkVerification from 'components/ui/trademark-verification';

export default reduxForm(
	{
		form: 'trademarkVerification',
		fields: [ 'smd' ]
	},
	null,
	dispatch => ( {
		changeSmd( value ) {
			dispatch( change( 'trademarkVerification', 'smd', value ) );
		}
	} )
)( TrademarkVerification );
