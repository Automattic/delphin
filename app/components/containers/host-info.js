// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import HostInfo from 'components/ui/host-info';

export default connect(
	( state, ownProps ) => ( {
		slug: ownProps.params.slug
	} )
)( HostInfo );
