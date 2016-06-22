// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { purchaseDomain } from 'actions';
import { getPath } from 'routes';
import { isLoggedIn, isLoggedOut, getUserSettings } from 'reducers/user/selectors';

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
			'privacyProtection'
		]
	},
	state => ( {
		checkout: state.checkout,
		initialValues: { name: getFullName( state ), privacyProtection: true },
		isLoggedIn: isLoggedIn( state ),
		isLoggedOut: isLoggedOut( state ),
		user: getUserSettings( state )
	} ),
	dispatch => ( {
		purchaseDomain() {
			dispatch( purchaseDomain() );
		},
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		},
		redirectToLogin() {
			dispatch( push( getPath( 'loginUser' ) ) );
		},
		redirectToSuccess() {
			dispatch( push( getPath( 'success' ) ) );
		}
	} )
)( Checkout );
