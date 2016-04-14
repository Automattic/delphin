// Internal dependencies
import {
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	CREATE_USER_COMPLETE,
	SELECT_DOMAIN
} from 'reducers/action-types';

export function checkout( state = {}, action ) {
	const { domain, type } = action;

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

		case CREATE_USER_COMPLETE:
			return Object.assign( {}, state, {
				user: {
					username: action.username,
					email: action.email,
					password: action.password,
					bearerToken: action.bearerToken
				}
			} );

		case SELECT_DOMAIN:
			return { domain };

		default:
			return state;
	}
}
