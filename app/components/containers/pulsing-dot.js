// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import PulsingDot from 'components/ui/pulsing-dot';
import { isAnySectionLoading } from 'reducers/ui/is-section-loading/selectors';

export default connect(
	state => ( {
		isVisible: isAnySectionLoading( state ),
	} )
)( PulsingDot );
