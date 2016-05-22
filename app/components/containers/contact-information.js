// External dependencies
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import ContactInformation from 'components/ui/contact-information';
import { getPath } from 'routes';
import { isLoggedOut } from 'reducers/user/selectors';

export default reduxForm(
	{
		form: 'address',
		fields: [ 'name', 'addressLine1', 'addressLine2', 'city', 'state', 'country', 'fax', 'phone' ]
	},
	state => ( {
		isLoggedOut: isLoggedOut( state )
	} ),
	dispatch => ( {
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		}
	} )
)( ContactInformation );
