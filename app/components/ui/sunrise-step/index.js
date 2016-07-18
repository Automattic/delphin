// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Header from './header';
import Form from './form';
import Footer from './footer';
import styles from './styles.scss';

const SunriseStep = ( { children } ) => (
	<div className={ styles.sunriseStep }>
		{ children }
	</div>
);

SunriseStep.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ).isRequired
};

SunriseStep.Header = Header;
SunriseStep.Form = Form;
SunriseStep.Footer = Footer;

export default withStyles( styles )( SunriseStep );
