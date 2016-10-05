// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import SunriseLayout from '.';

const SunriseFlowLayout = ( { children } ) => (
	<SunriseLayout isFooterDark={ true }>
		{ children }
	</SunriseLayout>
);

SunriseFlowLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default SunriseFlowLayout;
