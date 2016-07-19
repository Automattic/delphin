// External dependencies
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

		default:
			return state;
	}
};

export const step = ( state = 0, action ) => {
	const { type } = action;

	switch ( type ) {
		case FLOW_ENTER:
		case FLOW_EXIT:
			return 0;
		case FLOW_NEXT_STEP:
			return state + 1;
		case FLOW_PREVIOUS_STEP:
			return state - 1;

		default:
			return state;
	}
};

export default combineReducers( { name, step } );
