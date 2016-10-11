// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingBlog from 'components/ui/set-up-domain/connecting-blog';

export default connect(
	( state, ownProps ) => ( {
		blogType: 'existing',
		domainName: ownProps.params.domainName,
		hostName: ownProps.params.hostName
	} )
)( ConnectingBlog );
