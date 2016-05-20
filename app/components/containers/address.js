// External dependencies
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import Address from 'components/ui/address';
import { getPath } from 'routes';

export default reduxForm(
	{
		form: 'address',
		fields: [ 'name', 'addressLine1', 'addressLine2', 'city', 'state', 'country', 'phone' ]
	},
	null,
	dispatch => ( {
		redirectToSignup() {
			dispatch( push( getPath( 'signupUser' ) ) );
		},
		redirectToCheckout() {
			dispatch( push( getPath( 'checkout' ) ) );
		}
	} )
)( Address );
