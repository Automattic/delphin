// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { recordTracksEvent } from 'actions/analytics';
import TrackingLink from 'components/ui/tracking-link';

export default connect(
	() => ( { } ),
	( dispatch, ownProps )=> bindActionCreators( {
		trackEvent: () => {
			return recordTracksEvent( ownProps.eventName, Object.assign( { link_clicked: ownProps.to }, ownProps.eventParams ) );
		}
	}, dispatch )
)( TrackingLink );
