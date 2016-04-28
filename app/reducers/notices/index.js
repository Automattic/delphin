// Internal dependencies
import {
	NOTICE_ADD,
	NOTICE_CLEAR
} from 'reducers/action-types';

export function notices( state = [], action ) {
	const { notice, type } = action;

	switch ( type ) {
		case NOTICE_ADD:
			return [
				...state,
				notice
			];

		case NOTICE_CLEAR:
			state.splice( notice, 1 );
			return [ ...state ];

		default:
			return state;
	}
}
