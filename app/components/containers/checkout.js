// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { fetchPaygateConfiguration, purchaseDomain } from 'actions/checkout';
import { validateCheckoutForm } from 'lib/checkout';
import { getAsyncValidateFunction } from 'lib/form';
import { hasDomainTrademarkClaim } from 'reducers/domain-availability/selectors';
import { resetCheckout } from 'actions/checkout';
import { getPath } from 'routes';
import { hasSelectedDomain, getSelectedDomain, getSelectedDomainCost, hasLoadedPaygateConfigurationFromServer } from 'reducers/checkout/selectors';
import { getCountryCode, getFullName, getPostalCode } from 'reducers/contact-information/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import RequireLogin from 'components/containers/require-login';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';
import { showToggle, hideToggle } from 'actions/ui/toggle';
import { getToggle } from 'reducers/ui/toggle/selectors';

export default reduxForm(
	{
		form: 'checkout',
		fields: [
			'name',
			'number',
			'cvv',
			'expirationMonth',
			'expirationYear',
			'countryCode',
			'postalCode'
		],
		asyncValidate: getAsyncValidateFunction( validateCheckoutForm )
	},
	state => ( {
		checkout: state.checkout,
		hasSelectedDomain: hasSelectedDomain( state ),
		hasLoadedPaygateConfigurationFromServer: hasLoadedPaygateConfigurationFromServer( state ),
		hasTrademarkClaim: hasDomainTrademarkClaim( state, getSelectedDomain( state ).domainName ),
		domain: getSelectedDomain( state ),
		domainCost: getSelectedDomainCost( state ),
		isPurchasing: getToggle( state, 'isCheckoutProcessing' ),
		initialValues: {
			name: getFullName( state ),
			countryCode: getCountryCode( state ),
			postalCode: getPostalCode( state )
		},
		user: getUserSettings( state )
	} ),
	dispatch => bindActionCreators( {
		fetchPaygateConfiguration,
		purchaseDomain: withAnalytics(
			recordTracksEvent( 'delphin_application_review_submit' ),
			purchaseDomain
		),
		showProcessingMessage: () => showToggle( 'isCheckoutProcessing', { persistent: true } ),
		hideProcessingMessage: () => hideToggle( 'isCheckoutProcessing' ),
		resetCheckout,
		redirect: pathSlug => push( getPath( pathSlug ) )
	}, dispatch )
)( RequireLogin( Checkout ) );
