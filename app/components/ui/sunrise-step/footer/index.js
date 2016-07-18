// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SunriseStepFooter = ( { children, className } ) => (
	<div className={ classNames( className, styles.footer ) }>
		{ children }
	</div>
);

SunriseStepFooter.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ),
	className: PropTypes.string
};

export default withStyles( styles )( SunriseStepFooter );
