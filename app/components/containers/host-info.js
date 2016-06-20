// External dependencies
import { connect } from 'react-redux';
import config from 'config';

// Internal dependencies
import HostInfo from 'components/ui/host-info';
import { getPath } from 'routes';

export default connect(
	( state, ownProps ) => ( {
		hostName: ownProps.params.hostName,
		host: config( 'hosts' ).find( ( host ) => host.name === ownProps.params.hostName ),
		backUrl: getPath( 'hosts' )
	} ),
	dispatch => ( {
		
	} )
)( HostInfo );
