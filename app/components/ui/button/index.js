// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Button = ( { children, className, ...props } ) => (
	<button
		className={ classNames( styles.button, className ) }
		{ ...props }
	>
		{ children }
	</button>
);

Button.propTypes = {
	children: React.PropTypes.oneOfType( [
		React.PropTypes.arrayOf( React.PropTypes.node ),
		React.PropTypes.node
	] ),
	className: PropTypes.string
};

export default withStyles( styles )( Button );
