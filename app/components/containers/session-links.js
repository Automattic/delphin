// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { getRouteSlug } from 'app/routes';
import SessionLinks from 'components/ui/menu/session-links';
import { isLoggedIn } from 'reducers/user/selectors';
import { logoutUser } from 'actions/user';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';

export default connect(
	( state, { location } ) => ( {
		isExcluded: getRouteSlug( location.pathname ) !== 'search',
		isLoggedIn: isLoggedIn( state )
	} ),
	dispatch => bindActionCreators( {
		logoutUser: withAnalytics(
			recordTracksEvent( 'delphin_footer_link_click', { link_clicked: 'logout' } ),
			logoutUser
		)
	}, dispatch )
)( SessionLinks );
