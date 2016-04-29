// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Notices from 'components/ui/notices';

export default connect(
	state => ( { notices: state.notices } )
)( Notices );
