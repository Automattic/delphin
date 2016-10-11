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
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		redirectToConfirmConnectBlog: () => {
			const { domainName } = ownProps.params;

			return redirect( 'confirmConnectNewBlog', { pathParams: { domainName } } );
		}
	}, dispatch )
)( ConnectingBlog );
