// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux';

// Internal dependencies
import {
	FLOW_ENTER,
	FLOW_EXIT,
	FLOW_NEXT_STEP,
	FLOW_PREVIOUS_STEP
} from 'reducers/action-types';

export const name = ( state = null, action ) => {
	const { type, value } = action;

	switch ( type ) {
		case FLOW_ENTER:
			return value;

		case FLOW_EXIT:
			return null;

	}
};

export const step = ( state = 0, action ) => {
	const { type } = action;

	switch ( type ) {
		case FLOW_PREVIOUS_STEP:
			return state - 1;
		case LOCATION_CHANGE:
			if ( action.payload.action === 'POP' && state > 0 ) {
				return state - 1;
			}
			return state;
		case FLOW_ENTER:
		case FLOW_EXIT:
			return 0;
		case FLOW_NEXT_STEP:
			return state + 1;

		default:
			return state;
	}
};

export default combineReducers( { name, step } );
