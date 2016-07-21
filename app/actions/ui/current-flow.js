// External dependencies
import {
	FLOW_ENTER,
	FLOW_EXIT,
	FLOW_NEXT_STEP,
	FLOW_PREVIOUS_STEP
} from 'reducers/action-types';
import { push } from 'react-router-redux';

// Internal dependencies
import config from 'config';
import { getCurrentFlowName, getCurrentFlowStep } from 'reducers/ui/current-flow/selectors';
import { getPath } from 'routes';

const flows = config( 'flows' );

const getCurrentPageSlug = ( currentFlow, currentStep ) => {
	return flows[ currentFlow ][ currentStep ];
};

export const enterFlow = ( flowName ) => dispatch => dispatch( { type: FLOW_ENTER, value: flowName } );
export const exitFlow = { type: FLOW_EXIT };

export const refreshStep = () => ( dispatch, getState ) => {
	const state = getState(),
		flowName = getCurrentFlowName( state ),
		step = getCurrentFlowStep( state );

	if ( ! flowName ) {
		return;
	}

	dispatch( push( getPath( getCurrentPageSlug( flowName, step ) ) ) );
};

export const goToNextStep = () => ( dispatch, getState ) => {
	dispatch( { type: FLOW_NEXT_STEP } );
	refreshStep()( dispatch, getState );
};

export const goToPreviousStep = () => ( dispatch, getState ) => {
	dispatch( { type: FLOW_PREVIOUS_STEP } );
	refreshStep()( dispatch, getState );
};
