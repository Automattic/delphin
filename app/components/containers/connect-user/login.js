// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectUserContainer from 'components/containers/connect-user';

export default connect(
	() => ( {
		intention: 'login'
	} )
)( ConnectUserContainer );
