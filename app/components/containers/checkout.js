// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { createSite, createTransaction, createUser } from 'actions';
import { getPath } from 'routes';

export default connect(
	state => ( {
		checkout: state.checkout
	} ),
	dispatch => ( {
		createSite( form ) {
			dispatch( createSite( form ) );
		},
		createTransaction( form ) {
			dispatch( createTransaction( form ) );
		},
		createUser( form ) {
			dispatch( createUser( form ) );
		},
		redirectToSearch() {
			dispatch( push( getPath( 'search' ) ) );
		},
		redirectToSuccess() {
			dispatch( push( getPath( 'success' ) ) );
		}
	} )
)( Checkout );
