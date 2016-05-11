// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Menu from 'components/ui/menu';
import { logoutUser } from 'actions';

export default connect(
	state => ( {
		user: state.user
	} ),
	dispatch => ( {
		logoutUser() {
			return dispatch( logoutUser() );
		}
	} )
)( Menu );
