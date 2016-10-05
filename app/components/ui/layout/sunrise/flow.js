// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import SunriseLayout from './index';

const SunriseFlowLayout = ( { children } ) => (
	<SunriseLayout dark={ true }>
		{ children }
	</SunriseLayout>
);

SunriseFlowLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default SunriseFlowLayout;
