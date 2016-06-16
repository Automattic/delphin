// Internal dependencies
import {
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	DOMAIN_SELECT
} from 'reducers/action-types';

export function checkout( state = {}, action ) {
	const { type, blogId, domain } = action;

	switch ( type ) {
		case CREATE_SITE_COMPLETE:
			return Object.assign( {}, state, {
				site: {
					blogId
				}
			} );

		case CREATE_TRANSACTION_COMPLETE:
			return Object.assign( {}, state, {
				transaction: {
					domain,
					blogId
				}
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
