// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getToggle } from 'reducers/ui/toggle/selectors';
import { hideToggle, showToggle } from 'actions/ui/toggle';
import { isLoggedIn } from 'reducers/user/selectors';
import Header from 'components/ui/header';
import { logoutUser } from 'actions/user';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';
import { redirect } from 'actions/routes';

export default connect(
	state => ( {
		isLoggedIn: isLoggedIn( state ),
		isMenuVisible: getToggle( state, 'headerMenu' ),
	} ),
	dispatch => bindActionCreators( {
		logoutUser: withAnalytics(
			recordTracksEvent( 'delphin_header_link_click', { link_clicked: 'logout' } ),
			logoutUser
		),
		hideToggle,
		showToggle,
		redirect,
		addNotice,
	}, dispatch )
)( Header );
