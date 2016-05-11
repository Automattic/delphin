// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'routes';
import Success from 'components/ui/success';

export default connect(
	state => ( {
		transaction: state.checkout && state.checkout.transaction
	} ),
	dispatch => ( {
		redirectToHome() {
			dispatch( push( getPath( 'home' ) ) );
		}
	} )
)( Success );
