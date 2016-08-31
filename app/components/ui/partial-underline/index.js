// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const PartialUnderline = ( { children, className, centered, ...props } ) => {
	const cssClasses = classNames( {
		[ styles.partialUnderline ]: true,
		[ styles.centered ]: !! centered
	}, className );

	return (
		<div className={ cssClasses } { ...props }>
			{ children }
		</div>
	);
};

PartialUnderline.propTypes = {
	centered: PropTypes.bool,
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string
};

export default withStyles( styles )( PartialUnderline );
