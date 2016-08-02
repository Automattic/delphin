// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectUserContainer from 'components/containers/connect-user';
import { getPath } from 'routes';
import { recordPageView } from 'actions/analytics';

export default connect(
	() => ( {
		intention: 'login'
	} ),
	( dispatch ) => ( {
		recordPageView() {
			dispatch( recordPageView( getPath( 'loginUser' ), 'Login' ) );
		}
	} )
)( ConnectUserContainer );
