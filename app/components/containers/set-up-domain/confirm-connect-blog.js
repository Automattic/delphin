// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import ConfirmConnectBlog from 'components/ui/set-up-domain/confirm-connect-blog';
import RequireLogin from 'components/containers/require-login';
import { getBlogType } from 'reducers/form/selectors';
import { recordTracksEvent } from 'actions/analytics';
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
		recordTracksEvent,
	}, dispatch )
)( RequireLogin( ConfirmConnectBlog ) );
