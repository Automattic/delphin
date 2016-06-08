// External dependencies
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import ContactInformation from 'components/ui/contact-information';
import { fetchContactInformation } from 'actions/contact-information';
import { fetchCountries } from 'actions/countries';
import { getPath } from 'routes';
import { getUserSettings, isLoggedIn, isLoggedOut } from 'reducers/user/selectors';

export default reduxForm(
	{
		form: 'address',
		fields: [
			'name',
			'organization',
			'address1',
			'address2',
			'city',
			'state',
			'countryCode',
			'postalCode',
			'fax',
			'phone'
		]
	},
	state => ( {
		contactInformation: state.contactInformation,
		countries: state.countries,
		isLoggedOut: isLoggedOut( state ),
		isLoggedIn: isLoggedIn( state ),
		user: getUserSettings( state )
	} ),
	dispatch => ( {
		fetchContactInformation() {
			dispatch( fetchContactInformation() );
		},
		fetchCountries() {
			dispatch( fetchCountries() );
		},
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		}
	} )
)( ContactInformation );
