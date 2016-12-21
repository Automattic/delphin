// Internal dependencies
import {
	TOGGLE_HIDE,
	TOGGLE_SHOW,
} from 'reducers/action-types';

export const hideToggle = name => ( { type: TOGGLE_HIDE, name } );
export const showToggle = ( name, options = {} ) => ( { type: TOGGLE_SHOW, name, ...options } );
