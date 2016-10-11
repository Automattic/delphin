// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConnectingBlog from 'components/ui/set-up-domain/connecting-blog';
import { redirect } from 'actions/routes';

export default connect(
	( state, ownProps ) => ( {
		blogType: 'new',
		domainName: ownProps.params.domainName,
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		redirectToConfirmConnectBlog: () => {
			const { domainName } = ownProps.params;

			return redirect( 'confirmConnectNewBlog', { pathParams: { domainName } } );
		}
	}, dispatch )
)( ConnectingBlog );
