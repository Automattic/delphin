// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import Success from 'components/ui/success';

export default connect(
	state => {
		return {
			transaction: state.checkout && state.checkout.transaction
		};
	},
	dispatch => {
		return {
			redirect: url => {
				dispatch( push( url ) );
			}
		};
	}
)( Success );
