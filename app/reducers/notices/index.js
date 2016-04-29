// External dependencies
import uniqueId from 'lodash/uniqueId';

// Internal dependencies
import {
	NOTICE_ADD,
	NOTICE_REMOVE
} from 'reducers/action-types';

export function notices( state = [], action ) {
	const { notice, type } = action;

	switch ( type ) {
		case NOTICE_ADD:
			return [
				...state,
				Object.assign( {}, notice, { id: uniqueId() } )
			];

		case NOTICE_REMOVE:
			return [ ...state.filter( n => n.id !== notice.id ) ];

		default:
			return state;
	}
}
