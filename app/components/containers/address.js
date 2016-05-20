// External dependencies
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import Address from 'components/ui/address';
import { getPath } from 'routes';
import { isLoggedOut } from 'reducers/user/selectors';

export default reduxForm(
	{
		form: 'address',
		fields: [ 'name', 'addressLine1', 'addressLine2', 'city', 'state', 'country', 'phone' ]
	},
	state => ( {
		isLoggedOut: isLoggedOut( state )
	} ),
	dispatch => ( {
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		}
	} )
)( Address );
