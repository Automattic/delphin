// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import Button from 'components/ui/button';

const TrackingButton = ( props ) => {
	const {
		children,
		trackEvent,
		...newProps
	} = props;

	return (
		<Button onClick={ trackEvent } { ...newProps }>
			{ children }
		</Button>
	);
};

TrackingButton.propTypes = {
	children: PropTypes.node,
	trackEvent: PropTypes.func.isRequired
};

export default TrackingButton;
