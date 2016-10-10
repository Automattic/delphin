// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingExistingBlog from 'components/ui/set-up-domain/connecting-existing-blog';

export default connect(
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hostName: ownProps.params.hostName
	} )
)( ConnectingExistingBlog );
