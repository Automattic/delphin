// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConnectExistingBlog from 'components/ui/set-up-domain/connect-existing-blog';
import { redirect } from 'actions/routes';

export default connect(
	( state, ownProps ) => ( {
		blogUrl: 'www.blog.com',
		domainName: ownProps.params.domainName
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( ConnectExistingBlog );
