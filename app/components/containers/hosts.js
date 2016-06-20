// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import config from 'config';

// Internal dependencies
import Hosts from 'components/ui/hosts';
import { getPath } from 'routes';

export default connect(
	state => ( {
		hosts: config( 'hosts' )
	} ),
	dispatch => ( {
		redirectToHostInfo: ( hostName ) =>	dispatch( push( { pathname: getPath( 'hostInfo' ) + '/' + hostName } ) )
	} )
)( Hosts );
