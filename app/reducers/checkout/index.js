// Internal dependencies
import {
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	DOMAIN_SELECT
} from 'reducers/action-types';

export function checkout( state = {}, action ) {
	const { type } = action;

	switch ( type ) {
		case CREATE_SITE_COMPLETE:
			return Object.assign( {}, state, {
				site: {
					domain: action.domain,
					blogId: action.blogId
				}
			} );

		case CREATE_TRANSACTION_COMPLETE:
			return Object.assign( {}, state, {
				transaction: action.form
			} );

		case DOMAIN_SELECT:
			return {
				domain: action.value && action.value.domain_name,
				cost: action.value && action.value.cost
			};

		default:
			return state;
	}
}
