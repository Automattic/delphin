// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { isLoggedIn } from 'reducers/user/selectors';
import Header from 'components/ui/header';
import { logoutUser } from 'actions/user';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';

export default connect(
	state => ( {
		isLoggedIn: isLoggedIn( state )
	} ),
	dispatch => bindActionCreators( {
		logoutUser: withAnalytics(
			recordTracksEvent( 'delphin_header_link_click', { link_clicked: 'logout' } ),
			logoutUser
		)
	}, dispatch )
)( Header );
