// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import {
	CONTACT_INFORMATION_ADDRESS2_INPUT_SHOW,
	CONTACT_INFORMATION_INPUT_VISIBILITY_RESET,
	CONTACT_INFORMATION_ORGANIZATION_INPUT_SHOW
} from 'reducers/action-types';

export const inputVisibilityInitialState = {
	address2InputIsVisible: false,
	organizationInputIsVisible: false
};

export const inputVisibility = ( state = inputVisibilityInitialState, action ) => {
	const { type } = action;

	switch ( type ) {
		case CONTACT_INFORMATION_ADDRESS2_INPUT_SHOW:
			return Object.assign( {}, state, { address2InputIsVisible: true } );

		case CONTACT_INFORMATION_ORGANIZATION_INPUT_SHOW:
			return Object.assign( {}, state, { organizationInputIsVisible: true } );

		case CONTACT_INFORMATION_INPUT_VISIBILITY_RESET:
			return inputVisibilityInitialState;

		default:
			return state;
	}
};

export const contactInformation = combineReducers( { inputVisibility } );
