// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import PulsingDot from 'components/ui/pulsing-dot';
import { getToggle } from 'reducers/ui/toggle/selectors';

export default connect(
	state => ( {
		isVisible: getToggle( state, 'isSectionLoading' ),
	} )
)( PulsingDot );
