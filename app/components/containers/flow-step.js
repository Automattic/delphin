// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { getCurrentFlowName, getCurrentFlowStep } from 'reducers/ui/current-flow/selectors';
import {
	enterFlow,
	exitFlow,
	goToNextStep,
	goToPreviousStep
} from 'actions/ui/current-flow';

export default component => connect(
	state => ( {
		currentFlow: getCurrentFlowName( state ),
		currentStep: getCurrentFlowStep( state )
	} ),
	{
		enterFlow,
		exitFlow,
		goToNextStep,
		goToPreviousStep
	}
)( component );
