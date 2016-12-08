// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Tag = ( { children, className, isWarning, isError, ...props } ) => {
	const classes = classNames( {
		[ styles.tag ]: true,
		[ styles.isWarning ]: !! isWarning,
		[ styles.isError ]: !! isError,
	}, className );

	return (
		<span className={ classes } { ...props }>
			{ children }
		</span>
	);
};

Tag.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string,
	isError: PropTypes.bool,
	isWarning: PropTypes.bool,
};

export default withStyles( styles )( Tag );
