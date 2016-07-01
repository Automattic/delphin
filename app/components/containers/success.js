// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'routes';
import { isLoggedIn, isLoggedOut } from 'reducers/user/selectors';
import Success from 'components/ui/success';
import { updatePageTitle } from 'actions/page';

export default connect(
	state => ( {
		isLoggedIn: isLoggedIn( state ),
		isLoggedOut: isLoggedOut( state ),
		transaction: state.checkout && state.checkout.transaction
	} ),
	dispatch => ( {
		redirectToLogin() {
			dispatch( push( getPath( 'loginUser' ) ) );
		},
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		},

		updatePageTitle( title ) {
			dispatch( updatePageTitle( title ) );
		}
	} )
)( Success );
