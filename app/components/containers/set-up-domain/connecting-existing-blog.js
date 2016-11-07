// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingBlog from 'components/ui/set-up-domain/connecting-blog';
import { getBlogType } from 'reducers/form/selectors';

export default connect(
	( state, { params: { domainName, hostName, service } } ) => ( {
		blogType: getBlogType( state ),
		domainName,
		hostName,
		service
	} ),
)( ConnectingBlog );
