// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SunriseLayout from '.';
import styles from './flow.scss';

const SunriseFlowLayout = ( { children } ) => (
	<SunriseLayout languagePickerClassName={ styles.languagePicker }>
		{ children }
	</SunriseLayout>
);

SunriseFlowLayout.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( SunriseFlowLayout );
