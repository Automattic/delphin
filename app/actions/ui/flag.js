// Internal dependencies
import {
	FLAG_DISABLE,
	FLAG_ENABLE,
} from 'reducers/action-types';

export const disableFlag = name => ( { type: FLAG_DISABLE, name } );
export const enableFlag = ( name, options = {} ) => ( { type: FLAG_ENABLE, name, ...options } );
