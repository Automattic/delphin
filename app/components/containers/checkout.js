// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { purchaseDomain } from 'actions';
import { getPath } from 'routes';
import { isLoggedIn, getUserSettings } from 'reducers/user/selectors';

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
		isLoggedIn: isLoggedIn( state ),
		user: getUserSettings( state )
	} ),
	dispatch => ( {
		purchaseDomain() {
			dispatch( purchaseDomain() );
		},
		redirectToSearch() {
			dispatch( push( getPath( 'search' ) ) );
		},
		redirectToSignup() {
			dispatch( push( getPath( 'signupUser' ) ) );
		},
		redirectToSuccess() {
			dispatch( push( getPath( 'success' ) ) );
		}
	} )
)( Checkout );
