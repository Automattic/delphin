// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import SunriseLayout from './index';

const SunriseSuccessLayout = ( { children } ) => (
	<SunriseLayout dark={ false }>
		{ children }
	</SunriseLayout>
);

SunriseSuccessLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default SunriseSuccessLayout;
