// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

export const FieldArea = withStyles( styles )( ( { children, className } ) => (
	<div className={ classNames( styles.fieldArea, className ) }>
		{ children }
	</div>
) );

FieldArea.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string,
};

export default FieldArea;
