// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import HostInfo from 'components/ui/host-info';
import { getPath } from 'routes';

export default connect(
	( state, ownProps ) => ( {
		hostName: ownProps.params.hostName,
		backUrl: getPath( 'hosts' )
	} )
)( HostInfo );
