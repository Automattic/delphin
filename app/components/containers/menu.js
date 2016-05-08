// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Menu from 'components/ui/menu';

export default connect(
	state => ( {
		user: state.user
	} )
)( Menu );
