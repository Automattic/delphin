// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SunriseLayout from '.';
import styles from './success.scss';

const SunriseSuccessLayout = ( { children } ) => (
	<SunriseLayout>
		{ children }
	</SunriseLayout>
);

SunriseSuccessLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( SunriseSuccessLayout );
