// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const PartialUnderline = ( { children, className, ...props } ) => (
	<div className={ classNames( styles.partialUnderline, className ) } { ...props }>
		{ children }
	</div>
);

PartialUnderline.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string
};

export default withStyles( styles )( PartialUnderline );
