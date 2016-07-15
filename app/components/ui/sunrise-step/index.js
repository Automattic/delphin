// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SunriseStep = ( { children, heading, secondaryHeading } ) => (
	<div className={ styles.container }>
		<h1 className={ styles.heading }>{ heading }</h1>
		<h2 className={ styles.secondaryHeading }>{ secondaryHeading }</h2>
		<div className={ styles.content }>
			{ children }
		</div>
	</div>
);

SunriseStep.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ),
	heading: PropTypes.string.isRequired,
	secondaryHeading: PropTypes.string.isRequired
};

export default withStyles( styles )( SunriseStep );
