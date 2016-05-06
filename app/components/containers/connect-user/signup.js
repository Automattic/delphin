// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ConnectUser from 'components/containers/connect-user';

export default connect(
	() => ( {
		intention: 'signup'
	} )
)( ConnectUser );
