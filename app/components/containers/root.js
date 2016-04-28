// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Root from 'components/ui/root';

export default connect(
	state => ( { notices: state.notices } )
)( Root );
