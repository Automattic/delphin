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
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { hasDomainTrademarkClaim } from 'reducers/domain-availability/selectors';
import { getUserLocation } from 'reducers/user/selectors';
import { inputVisibility } from 'reducers/ui/contact-information/selectors';
import RequireSignup from 'components/containers/require-signup';
import { showAddress2Input, showOrganizationInput, resetInputVisibility } from 'actions/ui/contact-information';
import { validateContactInformation } from 'actions/contact-information';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

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
		domain: getSelectedDomain( state ),
		hasSelectedDomain: hasSelectedDomain( state ),
		hasTrademarkClaim: hasDomainTrademarkClaim( state, getSelectedDomain( state ).domainName ),
		inputVisibility: inputVisibility( state ),
		userLocation: getUserLocation( state ),
		states: getStates( state, get( state, 'form.contactInformation.countryCode.value' ) ),
	} ),
	dispatch => (
		bindActionCreators( {
			fetchContactInformation,
			fetchLocation,
			fetchStates,
			showAddress2Input,
			showOrganizationInput,
			resetInputVisibility,
			redirectToCheckout: withAnalytics(
				recordTracksEvent( 'delphin_contact_form_submit' ),
				() => push( getPath( 'checkout' ) )
			),
			redirectToHome: () => push( getPath( 'home' ) ),
			validateContactInformation: ( domainName, contactInformation ) => validateContactInformation( [ domainName ], contactInformation )
		}, dispatch )
	)
)( RequireSignup( ContactInformation, getPath( 'contactInformation' ) ) );
