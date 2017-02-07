// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

function getStepClassName( currentStepIndex, stepIndex ) {
	const classes = [ styles.progressbarStep ];

	if ( currentStepIndex === null ) {
		return styles.progressbarStep;
	}

	if ( stepIndex <= currentStepIndex ) {
		classes.push( styles.progressbarStepActive );
	}

	if ( stepIndex === currentStepIndex ) {
		classes.push( styles.progressbarStepLastActive );
	}

	return classes.join( ' ' );
}

function Progressbar( props ) {
	const currentStepIndex = props.currentStep;

	const steps = [
		i18n.translate( 'Search' ),
		i18n.translate( 'Log in' ),
		i18n.translate( 'Profile' ),
		i18n.translate( 'Checkout' )
	];

	return (
		<ol className={ props.className + ' ' + styles.progressbar }>
			{
				steps.map( ( step, index ) => <li key={ step } className={ getStepClassName( currentStepIndex, index ) }>
					<div className={ styles.progressbarStepCaption }>{ step }</div>
					<div className={ styles.progressbarStepDot }></div>
				</li> )
			}
		</ol>
	);
}

Progressbar.propTypes = {
	className: PropTypes.string,
	currentStep: PropTypes.number.isRequired
};

export default withStyles( styles )( Progressbar );
