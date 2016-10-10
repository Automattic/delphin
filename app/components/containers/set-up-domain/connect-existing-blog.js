// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectExistingBlog from 'components/ui/set-up-domain/connect-existing-blog';

export default connect(
	( state, ownProps ) => ( {
		blogUrl: 'www.blog.com',
		domainName: ownProps.params.domainName
	} )
)( ConnectExistingBlog );
