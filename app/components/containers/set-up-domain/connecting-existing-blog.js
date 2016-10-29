// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingBlog from 'components/ui/set-up-domain/connecting-blog';
import { getBlogType } from 'reducers/form/selectors';
import { redirect } from 'actions/routes';

export default connect(
	( state, ownProps ) => ( {
		blogType: getBlogType( state ),
		domainName: ownProps.params.domainName,
		hostName: ownProps.params.hostName
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		redirectToConfirmConnectBlog: () => {
			const { domainName, hostName, service } = ownProps.params;

			return redirect( 'confirmConnectExistingBlog', { pathParams: { domainName, hostName, service } } );
		}
	}, dispatch )
)( ConnectingBlog );
