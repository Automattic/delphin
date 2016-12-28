// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { purchaseDomain } from 'actions/checkout';
import { validateCheckoutForm } from 'lib/checkout';
import { getAsyncValidateFunction } from 'lib/form';
import { hasDomainTrademarkClaim } from 'reducers/domain-availability/selectors';
import { resetCheckout } from 'actions/checkout';
import { getPath } from 'routes';
import { hasSelectedDomain, isPurchasing, getSelectedDomain, getSelectedDomainCost } from 'reducers/checkout/selectors';
import { getCountryCode, getFullName, getPostalCode } from 'reducers/contact-information/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import RequireLogin from 'components/containers/require-login';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

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
		hasTrademarkClaim: hasDomainTrademarkClaim( state, getSelectedDomain( state ).domainName ),
		domain: getSelectedDomain( state ),
		domainCost: getSelectedDomainCost( state ),
		isPurchasing: isPurchasing( state ),
		initialValues: {
			name: getFullName( state ),
			countryCode: getCountryCode( state ),
			postalCode: getPostalCode( state )
		},
		user: getUserSettings( state )
	} ),
	dispatch => bindActionCreators( {
		purchaseDomain: withAnalytics(
			recordTracksEvent( 'delphin_application_review_submit' ),
			purchaseDomain
		),
		resetCheckout,
		redirect: pathSlug => push( getPath( pathSlug ) )
	}, dispatch )
)( RequireLogin( Checkout ) );
