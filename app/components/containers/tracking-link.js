// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { recordTracksEvent } from 'actions/analytics';
import TrackingLink from 'components/ui/tracking-link';

export default connect(
	state => state,
	( dispatch, ownProps )=> bindActionCreators( {
		trackEvent: () => {
			if ( typeof ownProps.eventParams !== 'undefined' ) {
				return recordTracksEvent( ownProps.eventName, ownProps.eventParams );
			}

			return recordTracksEvent( ownProps.eventName );
		}
	}, dispatch )
)( TrackingLink );
