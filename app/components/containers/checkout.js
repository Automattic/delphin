// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import Checkout from 'components/ui/checkout';
import { createSite, createTransaction, createUser } from 'actions';

export default connect(
	state => ( {
		checkout: state.checkout
	} ),
	dispatch => ( {
		redirect: url => {
			dispatch( push( url ) );
		},
		createSite: form => {
			dispatch( createSite( form ) );
		},
		createUser: ( form ) => {
			dispatch( createUser( form ) );
		},
		createTransaction: ( form ) => {
			dispatch( createTransaction( form ) );
		}
	} )
)( Checkout );
