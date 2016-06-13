// External dependencies
import uniqueId from 'lodash/uniqueId';
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	NOTICE_ADD,
	NOTICE_REMOVE
} from 'reducers/action-types';

export function notices( state = [], action ) {
	const { notice, type } = action;

	switch ( type ) {
		case LOCATION_CHANGE:
			// Clears all notices whenever the user is presented with a new page
			return [];

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
