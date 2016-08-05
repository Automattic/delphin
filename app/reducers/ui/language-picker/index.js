// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import {
	LANGUAGE_PICKER_SELECT_HIDE,
	LANGUAGE_PICKER_SELECT_SHOW
} from 'reducers/action-types';

export const isSelectVisible = ( state = false, action ) => {
	const { type } = action;

	switch ( type ) {
		case LANGUAGE_PICKER_SELECT_SHOW:
			return true;

		case LANGUAGE_PICKER_SELECT_HIDE:
			return false;

		default:
			return state;
	}
};

export default combineReducers( { isSelectVisible } );
