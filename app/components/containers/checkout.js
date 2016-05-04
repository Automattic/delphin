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
		createSite: form => {
			dispatch( createSite( form ) );
		},
		createTransaction: ( form ) => {
			dispatch( createTransaction( form ) );
		},
		createUser: ( form ) => {
			dispatch( createUser( form ) );
		},
		redirect: url => {
			dispatch( push( url ) );
		}
	} )
)( Checkout );
