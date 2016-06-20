// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import HostThumbnail from 'components/ui/hosts/host-thumbnail';
import { getPath } from 'routes';

export default connect(
	state => ( {
	} ),
	dispatch => ( {
		redirectToHostInfo: ( hostName ) =>	dispatch( push( { pathname: getPath( 'hostInfo' ) + '/' + hostName } ) ),
		connectHost: ( hostName ) => {}
	} )
)( HostThumbnail );
