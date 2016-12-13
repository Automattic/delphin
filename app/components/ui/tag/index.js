// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Tag = ( { children, className, type, ...props } ) => {
	const classes = classNames( styles.tag, {
		[ styles.isPremium ]: type === 'premium',
		[ styles.isTrademark ]: type === 'trademark'
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
	type: PropTypes.string.isRequired
};

export default withStyles( styles )( Tag );
