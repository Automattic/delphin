// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const FixedBackground = ( { light, dark } ) => {
	// force one or the other, ignore undefined, at least one must be given
	if ( dark === false ) {
		light = true;
	}
	if ( light === false ) {
		dark = true;
	}
	return (
		<div className={ classNames( styles.fixedBackground, {
			[ styles.light ]: light,
			[ styles.dark ]: dark
		} ) }></div>
	);
};

FixedBackground.propTypes = {
	dark: PropTypes.bool,
	light: PropTypes.bool,
};

export default withStyles( styles )( FixedBackground );
