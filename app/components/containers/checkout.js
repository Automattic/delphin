// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { fetchDomainPrice } from 'actions/domain-price';
import { getPath } from 'routes';
import { isPurchasing, getSelectedDomain } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import RequireLogin from './require-login';

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
		destroyOnUnmount: false
	},
	state => ( {
		checkout: state.checkout,
		domain: getSelectedDomain( state ).domain,
		isPurchasing: isPurchasing( state ),
		initialValues: {
			name: getFullName( state ),
			countryCode: state.contactInformation.data.countryCode,
			postalCode: state.contactInformation.data.postalCode,
			privacyProtection: true
		},
		user: getUserSettings( state )
	} ),
	( dispatch, ownProps ) => ( {
		fetchDomainPrice() {
			dispatch( fetchDomainPrice( ownProps.domain ) );
		},
		redirectToCheckoutReview() {
			dispatch( push( getPath( 'checkoutReview' ) ) );
		},
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		}
	} )
)( RequireLogin( Checkout ) );
