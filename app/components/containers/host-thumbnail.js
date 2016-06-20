// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import HostThumbnail from 'components/ui/hosts/host-thumbnail';
import { getPath } from 'routes';

export default connect(
	( state, ownProps ) => ( {
		learnMoreUrl: getPath( 'hostInfo', { hostName: ownProps.name } )
	} ),
	dispatch => ( {
		connectHost: ( hostName ) => {}
	} )
)( HostThumbnail );
