// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	TOGGLE_HIDE,
	TOGGLE_SHOW,
} from 'reducers/action-types';

const initialState = {};

const reducer = ( state = initialState, action ) => {
	const { name, type, persistent } = action;

	switch ( type ) {
		case LOCATION_CHANGE:
			return Object.keys( state ).reduce( ( newState, key ) => {
				if ( state[ key ].persistent ) {
					return { ...newState, [ key ]: state[ key ] };
				}

				return newState;
			}, {} );
		case TOGGLE_HIDE:
			return { ...state, [ name ]: { value: false, persistent: !! persistent } };
		case TOGGLE_SHOW:
			return { ...state, [ name ]: { value: true, persistent: !! persistent } };
		default:
			return state;
	}
};

export default reducer;
