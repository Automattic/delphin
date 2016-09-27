// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SubmitArea = withStyles( styles )( ( { children, className } ) => (
	<div className={ classNames( className, styles.submitArea ) }>
		{ children }
	</div>
) );

SubmitArea.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string
};

export default SubmitArea;
