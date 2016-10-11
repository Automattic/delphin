// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConfirmConnectBlog from 'components/ui/set-up-domain/confirm-connect-blog';

export default connect(
	( state, ownProps ) => ( {
		blogType: 'existing',
		domainName: ownProps.params.domainName,
		hostName: ownProps.params.hostName
	} )
)( ConfirmConnectBlog );
