// External dependencies
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import { reduxForm, reset } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	getPrices,
	isRequestingPricesFromServer,
	hasLoadedPricesFromServer
} from 'reducers/prices/selectors';
import { fetchPrices } from 'actions/prices';
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
	state => ( {
		prices: getPrices( state ),
		hasLoadedPricesFromServer: hasLoadedPricesFromServer( state ),
		isRequestingPricesFromServer: isRequestingPricesFromServer( state ),
	} ),
	{
		addNotice,
		fetchPrices,
		resetForm: dispatch => dispatch( reset( 'learnMore' ) )
	}
)( LearnMore );
