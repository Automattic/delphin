// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Menu from 'components/ui/menu';
import { isLoggedIn } from 'reducers/user/selectors';
import { logoutUser } from 'actions/user';

export default connect(
	state => ( {
		isLoggedIn: isLoggedIn( state )
	} ),
	dispatch => ( {
		logoutUser() {
			return dispatch( logoutUser() );
		}
	} )
)( Menu );
