// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConfirmConnectBlog from 'components/ui/set-up-domain/confirm-connect-blog';
import { getBlogType, getBlogServiceSelected } from 'reducers/form/selectors';
import { logInToWpcom } from 'actions/wpcom-log-in';
import { getService } from 'reducers/service/selectors';

export default connect(
	( state, ownProps ) => {
		const blogType = getBlogType( state );
		const service = blogType === 'existing' ? getService( state ) : getBlogServiceSelected( state );

		return {
			blogType,
			domainName: ownProps.params.domainName,
			hostName: ownProps.params.hostName,
			service,
		};
	},
	dispatch => bindActionCreators( {
		logInToWpcom,
	}, dispatch )
)( ConfirmConnectBlog );
