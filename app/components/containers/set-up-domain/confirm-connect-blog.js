// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConfirmConnectBlog from 'components/ui/set-up-domain/confirm-connect-blog';
import { getBlogType } from 'reducers/form/selectors';
import { logInToWpcom } from 'actions/wpcom-log-in';

export default connect(
	( state, { params: { domainName, hostName, service } } ) => ( {
		blogType: getBlogType( state ),
		domainName,
		hostName,
		service,
	} ),
	dispatch => bindActionCreators( {
		logInToWpcom,
	}, dispatch )
)( ConfirmConnectBlog );
