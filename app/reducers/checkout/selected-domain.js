// Internal dependencies
import {
	DOMAIN_SELECT,
	DOMAIN_UNSELECT
} from 'reducers/action-types';

export const selectedDomain = ( state = {}, action ) => {
	const { type } = action;

	switch ( type ) {
		case DOMAIN_SELECT:
			return action.value;

		case DOMAIN_UNSELECT:
			return {};

		default:
			return state;
	}
};
