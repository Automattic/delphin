// External dependencies
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import Hosts from 'components/ui/hosts';
import { getPath } from 'routes';

export default connect(
	( state, ownProps ) => ( {
		domainName: ownProps.location.query.domainName
	} ),
	dispatch => ( {
		redirectToHostInfo: ( hostName ) => dispatch( push( { pathname: getPath( 'hostInfo' ) + '/' + hostName } ) )
	} )
)( Hosts );
