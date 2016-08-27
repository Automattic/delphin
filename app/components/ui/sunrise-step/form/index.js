// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SunriseStepForm = ( { children, onSubmit, className } ) => (
	<form className={ classNames( className, styles.form ) } noValidate onSubmit={ onSubmit }>
		{ children }
	</form>
);

SunriseStepForm.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ),
	className: PropTypes.string,
	onSubmit: PropTypes.func
};

export default withStyles( styles )( SunriseStepForm );
