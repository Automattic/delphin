// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getFlag } from 'reducers/ui/flags/selectors';
import { getRouteSlug } from 'app/routes';
import { enableFlag, disableFlag } from 'actions/ui/flag';
import { isLoggedIn } from 'reducers/user/selectors';
import Header from 'components/ui/header';
import { logoutUser } from 'actions/user';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';

export default connect(
	( state, { location } ) => ( {
		isExcluded: getRouteSlug( location.pathname ) === 'search',
		isLoggedIn: isLoggedIn( state ),
		isMenuVisible: getFlag( state, 'headerMenu' ),
	} ),
	dispatch => bindActionCreators( {
		addNotice,
		disableFlag,
		logoutUser: withAnalytics(
			recordTracksEvent( 'delphin_header_link_click', { link_clicked: 'logout' } ),
			logoutUser
		),
		enableFlag,
	}, dispatch )
)( Header );
