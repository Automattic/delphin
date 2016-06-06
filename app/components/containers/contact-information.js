// External dependencies
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import ContactInformation from 'components/ui/contact-information';
import { fetchCountries } from 'actions/countries';
import { getPath } from 'routes';
import { isLoggedOut } from 'reducers/user/selectors';

export default reduxForm(
	{
		form: 'address',
		fields: [ 'name', 'organization', 'addressLine1', 'addressLine2', 'city', 'state', 'country', 'fax', 'phone' ]
	},
	state => ( {
		countries: state.countries,
		isLoggedOut: isLoggedOut( state ),
		user: state.user
	} ),
	dispatch => ( {
		fetchCountries() {
			dispatch( fetchCountries() );
		},
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		}
	} )
)( ContactInformation );
