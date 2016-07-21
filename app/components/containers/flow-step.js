// External dependencies
import { connect } from 'react-redux';
import React from 'react';
import { push } from 'react-router-redux';

// Internal dependencies
import { getCurrentFlowName, getCurrentFlowStep, inFlow } from 'reducers/ui/current-flow/selectors';
import {
	enterFlow,
	exitFlow,
	goToNextStep,
	goToPreviousStep,
	refreshStep
} from 'actions/ui/current-flow';
import { getPath } from 'routes';

const flowStep = ( ComposedComponent, flowName ) => React.createClass( {
	/* eslint-disable react/prop-types */
	componentWillMount() {
		if ( flowName ) {
			this.props.enterFlow( flowName );
		} else if ( ! this.props.inFlow ) {
			this.props.redirectToHome();
		}
	},
	render() {
		return <ComposedComponent { ...this.props } />;
	}
} );

export default ( Component, flowName ) => connect(
	state => ( {
		currentFlow: getCurrentFlowName( state ),
		currentStep: getCurrentFlowStep( state ),
		inFlow: inFlow( state )
	} ),
	{
		enterFlow,
		exitFlow,
		goToNextStep,
		goToPreviousStep,
		refreshStep,
		redirectToHome: () => dispatch => {
			dispatch( push( getPath( 'home' ) ) );
		}
	}
)( flowStep( Component, flowName ) );
