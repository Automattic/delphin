// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

// Internal dependencies
import { recordTracksEvent } from 'actions/analytics';
import TrackingButton from 'components/ui/tracking-button';

export default connect(
	() => ( {} ),
	( dispatch, ownProps ) => bindActionCreators( {
		trackEvent: () => recordTracksEvent(
			ownProps.eventName,
			Object.assign( { link_clicked: ownProps.href }, ownProps.eventParams )
		)
	}, dispatch ),
	( stateProps, dispatchProps, ownProps ) => {
		const newProps = omit( ownProps, [ 'eventName', 'eventParams' ] );

		return Object.assign( {}, newProps, stateProps, dispatchProps );
	}
)( TrackingButton );
