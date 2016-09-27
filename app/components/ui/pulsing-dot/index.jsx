// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const PulsingDot = isVisible => (
	<div className={ classNames( styles.pulsingDot, { [ styles.isVisible ]: isVisible } ) } />
);

PulsingDot.propTypes = {
	isVisible: PropTypes.bool.isRequired,
};

export default withStyles( styles )( PulsingDot );
