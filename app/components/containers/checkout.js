// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { createSite, createTransaction } from 'actions';
import { getPath } from 'routes';
import { isLoggedIn, getUserSettings } from 'reducers/user/selectors';

export default connect(
	state => ( {
		checkout: state.checkout,
		isLoggedIn: isLoggedIn( state ),
		user: getUserSettings( state )
	} ),
	dispatch => ( {
		createSite( user, form ) {
			dispatch( createSite( user, form ) );
		},
		createTransaction( user, form ) {
			dispatch( createTransaction( user, form ) );
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
