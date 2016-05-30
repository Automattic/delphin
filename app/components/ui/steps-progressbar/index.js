// External dependencies
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
	const currentStepIndex = props.currentStep ? props.steps.indexOf( props.currentStep ) : null;

	return <ol className={ props.className + ' ' + styles.progressbar }>
		{
			props.steps.map( ( step, index ) => <li key={ step } className={ getStepClassName( currentStepIndex, index ) }>
				<div className={ styles.progressbarStepCaption }>{ step }</div>
				<div className={ styles.progressbarStepDot }></div>
			</li> )
		}
	</ol>;
}

Progressbar.propTypes = {
	steps: PropTypes.arrayOf( PropTypes.string ).isRequired,
	currentStep: PropTypes.string
};

export default withStyles( styles )( Progressbar );
