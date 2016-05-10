// Internal dependencies
import { removeBearerCookie, saveTokenInBearerCookie } from 'client/bearer-cookie';
import {
	FETCH_USER_COMPLETE,
	FETCH_USER_FAIL,
	REMOVE_USER,
	VERIFY_USER_COMPLETE
} from 'reducers/action-types';

export const userMiddleware = () => next => action => {
	const { type } = action;

	switch ( type ) {
		case FETCH_USER_FAIL:
		case REMOVE_USER:
			removeBearerCookie();
			break;
		case FETCH_USER_COMPLETE:
		case VERIFY_USER_COMPLETE:
			saveTokenInBearerCookie( action.bearerToken );
			break;
	}

	return next( action );
};
