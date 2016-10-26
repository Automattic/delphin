// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingBlog from 'components/ui/set-up-domain/connecting-blog';
import { getBlogType } from 'reducers/form/selectors';
import { isConnected } from 'reducers/domain/selectors';
import { redirect } from 'actions/routes';
import { getService } from 'reducers/service/selectors';

export default connect(
	( state, ownProps ) => ( {
		blogType: getBlogType( state ),
		domainName: ownProps.params.domainName,
		hostName: ownProps.params.hostName,
		service: getService( state ),
		connected: isConnected( state )
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		redirectToConfirmConnectBlog: () => {
			const { domainName, hostName } = ownProps.params;

			return redirect( 'confirmConnectExistingBlog', { pathParams: { domainName, hostName } } );
		}
	}, dispatch )
)( ConnectingBlog );
