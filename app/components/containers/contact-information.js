// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import ContactInformation from 'components/ui/contact-information';
import { fetchContactInformation } from 'actions/contact-information';
import { fetchCountries } from 'actions/countries';
import { getPath } from 'routes';
import { getUserSettings, isLoggedIn, isLoggedOut } from 'reducers/user/selectors';
import { inputVisibility } from 'reducers/ui/contact-information/selectors';
import { showAddress2Input, showOrganizationInput, resetInputVisibility } from 'actions/ui/contact-information';
import { validateContactInformation } from 'actions/contact-information';

export default reduxForm(
	{
		form: 'contact-information',
		fields: [
			'firstName',
			'lastName',
			'organization',
			'address1',
			'address2',
			'city',
			'state',
			'countryCode',
			'postalCode',
			'phone'
		]
	},
	state => ( {
		contactInformation: state.contactInformation,
		countries: state.countries,
		domain: state.checkout.domain,
		isLoggedOut: isLoggedOut( state ),
		isLoggedIn: isLoggedIn( state ),
		inputVisibility: inputVisibility( state ),
		user: getUserSettings( state )
	} ),
	dispatch => (
		bindActionCreators( {
			fetchContactInformation,
			fetchCountries,
			showAddress2Input,
			showOrganizationInput,
			resetInputVisibility,
			redirectToHome: () => push( getPath( 'home' ) ),
			validateContactInformation: ( domainName, contactInformation ) => (
				validateContactInformation( [ domainName ], contactInformation )
			)
		}, dispatch )
	)
)( ContactInformation );
