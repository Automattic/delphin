// External dependencies
import classnames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Header from './header';
import Form from './form';
import Footer from './footer';
import styles from './styles.scss';

const SunriseStep = withStyles( styles )( ( { children, className } ) => (
	<div className={ classnames( className, styles.sunriseStep ) }>
		{ children }
	</div>
) );

SunriseStep.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ).isRequired
};

SunriseStep.Header = Header;
SunriseStep.Form = Form;
SunriseStep.Footer = Footer;

export default SunriseStep;
