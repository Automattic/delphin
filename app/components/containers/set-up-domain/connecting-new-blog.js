// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingBlog from 'components/ui/set-up-domain/connecting-blog';
import { getBlogType } from 'reducers/form/selectors';
import RequireLogin from 'components/containers/require-login';

export default connect(
	( state, { params: { domainName, service } } ) => ( {
		blogType: getBlogType( state ),
		domainName,
		service
	} ),
)( RequireLogin( ConnectingBlog ) );
