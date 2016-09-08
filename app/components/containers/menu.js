// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import Menu from 'components/ui/menu';
import { isLoggedIn } from 'reducers/user/selectors';
import { logoutUser } from 'actions/user';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';

export default connect(
	state => ( {
		isLoggedIn: isLoggedIn( state )
	} ),
	dispatch => bindActionCreators( {
		logoutUser: withAnalytics(
			recordTracksEvent( 'delphin_footer_link_click', { link_clicked: 'logout' } ),
			logoutUser
		)
	}, dispatch )
)( Menu );
