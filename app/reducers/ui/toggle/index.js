// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	TOGGLE_HIDE,
	TOGGLE_SHOW,
} from 'reducers/action-types';

const initialState = {};

const reducer = ( state = initialState, action ) => {
	const { name, type } = action;

	switch ( type ) {
		case LOCATION_CHANGE:
			return {};
		case TOGGLE_HIDE:
			return Object.assign( {}, state, { [ name ]: false } );
		case TOGGLE_SHOW:
			return Object.assign( {}, state, { [ name ]: true } );
		default:
			return state;
	}
};

export default reducer;
