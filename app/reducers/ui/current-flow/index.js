// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	FLOW_ENTER,
	FLOW_EXIT,
	FLOW_NEXT_STEP,
	FLOW_PREVIOUS_STEP
} from 'reducers/action-types';
import { isPartOfFlow } from 'lib/flows';
import { getSlugFromPath } from 'routes';

const initialState = {
	name: null,
	step: 0
};

export default ( state = initialState, action ) => {
	const { type, value } = action,
		{ name, step } = state;

	switch ( type ) {
		case FLOW_ENTER:
			return {
				name: value,
				step: 0
			};

		case FLOW_EXIT:
			return initialState;

		case FLOW_PREVIOUS_STEP:
			return Object.assign( {}, state, {
				step: step - 1
			} );
		case FLOW_NEXT_STEP:
			return Object.assign( {}, state, {
				step: step + 1
			} );
		case LOCATION_CHANGE:
			// POP = going back in the history or landing on a new page (page loaded for the first time)
			if ( action.payload.action === 'POP' ) {
				if ( step === 0 ) {
					return initialState;
				}
				return Object.assign( {}, state, {
					step: step - 1
				} );
			}
			// the new page is not part of the flow, exit current flow
			if ( action.payload.action === 'PUSH' && name &&
					! isPartOfFlow( getSlugFromPath( action.payload.pathname ), name ) ) {
				return initialState;
			}
			return state;

		default:
			return state;
	}
};
