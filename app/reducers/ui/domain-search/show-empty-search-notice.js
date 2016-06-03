// Internal dependencies
import {
	DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT
} from 'reducers/action-types';

export default function( state = false, action ) {
	switch ( action.type ) {
		case DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT:
			return true;
		default:
			return state;
	}
}
