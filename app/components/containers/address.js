// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import Address from 'components/ui/address';
import { getPath } from 'routes';

export default connect(
	null,
	dispatch => ( {
		redirectToSignup() {
			dispatch( push( getPath( 'signupUser' ) ) );
		},
		redirectToCheckout() {
			dispatch( push( getPath( 'checkout' ) ) );
		}
	} )
)( Address );
