// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { validateCheckoutForm } from 'lib/checkout';
import { getAsyncValidateFunction } from 'lib/form';
import { resetCheckout } from 'actions/checkout';
import { getPath } from 'routes';
import { hasSelectedDomain, isPurchasing, getSelectedDomain, getSelectedDomainCost, getSelectedDomainApplicationCost } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import RequireLogin from 'components/containers/require-login';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

/**
 * Retrieves the full name of the user from the contact information entered.
 *
 * @param {object} state - state tree
 * @returns {string} - the full name
 */
export const getFullName = state => {
	if ( ! state.form.contactInformation ) {
		return '';
	}

	const { firstName: { value: firstName }, lastName: { value: lastName } } = state.form.contactInformation;

	return `${ firstName } ${ lastName }`;
};

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
			'postalCode',
			'privacyProtection'
		],
		asyncValidate: getAsyncValidateFunction( validateCheckoutForm ),
		destroyOnUnmount: false
	},
	state => ( {
		checkout: state.checkout,
		hasSelectedDomain: hasSelectedDomain( state ),
		domain: getSelectedDomain( state ),
		domainCost: getSelectedDomainCost( state ),
		domainApplicationCost: getSelectedDomainApplicationCost( state ),
		isPurchasing: isPurchasing( state ),
		initialValues: {
			name: getFullName( state ),
			countryCode: state.contactInformation.data && state.contactInformation.data.countryCode,
			postalCode: state.contactInformation.data && state.contactInformation.data.postalCode,
			privacyProtection: true
		},
		user: getUserSettings( state )
	} ),
	dispatch => bindActionCreators( {
		resetCheckout,
		redirectToCheckoutReview: withAnalytics(
			recordTracksEvent( 'delphin_checkout_form_submit' ),
			push( getPath( 'checkoutReview' ) )
		),
		redirectToHome: () => push( getPath( 'home' ) ),
		trackPrivacyToggle: ( newValue ) => recordTracksEvent( 'delphin_privacy_toggle', { toggled_to: newValue } )
	}, dispatch )
)( RequireLogin( Checkout ) );
