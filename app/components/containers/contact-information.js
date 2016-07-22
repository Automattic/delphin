// External dependencies
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import ContactInformation from 'components/ui/contact-information';
import { fetchContactInformation } from 'actions/contact-information';
import { fetchStates } from 'actions/territories';
import { fetchLocation } from 'actions/location';
import { getStates } from 'reducers/territories/selectors';
import { getPath } from 'routes';
import { getUserLocation, getUserSettings, isLoggedIn, isLoggedOut } from 'reducers/user/selectors';
import { inputVisibility } from 'reducers/ui/contact-information/selectors';
import { showAddress2Input, showOrganizationInput, resetInputVisibility } from 'actions/ui/contact-information';
import { validateContactInformation } from 'actions/contact-information';

export default reduxForm(
	{
		form: 'contactInformation',
		fields: [
			'email',
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
		],
		destroyOnUnmount: false
	},
	state => ( {
		contactInformation: state.contactInformation,
		domain: state.checkout.selectedDomain.domain,
		isLoggedOut: isLoggedOut( state ),
		isLoggedIn: isLoggedIn( state ),
		inputVisibility: inputVisibility( state ),
		location: getUserLocation( state ),
		states: getStates( state, get( state, 'form.contactInformation.countryCode.value' ) ),
		user: getUserSettings( state )
	} ),
	dispatch => (
		bindActionCreators( {
			fetchContactInformation,
			fetchLocation,
			fetchStates,
			showAddress2Input,
			showOrganizationInput,
			resetInputVisibility,
			redirectToCheckout: () => push( getPath( 'checkout' ) ),
			redirectToLogin: () => push( getPath( 'loginUser' ) ),
			redirectToHome: () => push( getPath( 'home' ) ),
			validateContactInformation: ( domainName, contactInformation ) => (
				validateContactInformation( [ domainName ], contactInformation )
			)
		}, dispatch )
	)
)( ContactInformation );
