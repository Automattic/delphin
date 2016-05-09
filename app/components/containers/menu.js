// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Menu from 'components/ui/menu';
import { removeUser } from 'actions';

export default connect(
	state => ( {
		user: state.user
	} ),
	dispatch => ( {
		logoutUser() {
			return dispatch( removeUser() );
		}
	} )
)( Menu );
