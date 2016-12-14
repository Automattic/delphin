// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getToggle } from 'reducers/ui/toggle/selectors';
import { getRouteSlug } from 'app/routes';
import { hideToggle, showToggle } from 'actions/ui/toggle';
import { isLoggedIn } from 'reducers/user/selectors';
import Header from 'components/ui/header';
import { logoutUser } from 'actions/user';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';

export default connect(
	( state, { location } ) => ( {
		isLoggedIn: isLoggedIn( state ),
		isMenuVisible: getToggle( state, 'headerMenu' ),
		routeSlug: getRouteSlug( location.pathname ),
	} ),
	dispatch => bindActionCreators( {
		addNotice,
		hideToggle,
		logoutUser: withAnalytics(
			recordTracksEvent( 'delphin_header_link_click', { link_clicked: 'logout' } ),
			logoutUser
		),
		showToggle,
	}, dispatch )
)( Header );
