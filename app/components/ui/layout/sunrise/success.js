// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import SunriseLayout from '.';

const SunriseSuccessLayout = ( { children } ) => (
	<SunriseLayout>
		{ children }
	</SunriseLayout>
);

SunriseSuccessLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default SunriseSuccessLayout;
