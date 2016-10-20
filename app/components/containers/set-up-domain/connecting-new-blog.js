// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingBlog from 'components/ui/set-up-domain/connecting-blog';
import { getBlogType } from 'reducers/form/selectors';
import { getConnection } from 'reducers/domain/selectors';
import { redirect } from 'actions/routes';

export default connect(
	( state, ownProps ) => ( {
		blogType: getBlogType( state ),
		domainName: ownProps.params.domainName,
		service: ownProps.params.service,
		connected: getConnection( state )
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		redirectToConfirmConnectBlog: () => {
			const { domainName, service } = ownProps.params;

			return redirect( 'confirmConnectNewBlog', { pathParams: { domainName, service } } );
		}
	}, dispatch )
)( ConnectingBlog );
