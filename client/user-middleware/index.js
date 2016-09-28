// Internal dependencies
import { removeBearerCookie, saveTokenInBearerCookie } from 'client/bearer-cookie';
import {
	FETCH_USER_COMPLETE,
	FETCH_USER_FAIL,
	LOGOUT_USER,
	VERIFY_USER_COMPLETE
} from 'reducers/action-types';

export const userMiddleware = () => next => action => {
	const { type } = action;

	switch ( type ) {
		case FETCH_USER_FAIL:
		case LOGOUT_USER:
			removeBearerCookie();
			break;
		case FETCH_USER_COMPLETE:
		case VERIFY_USER_COMPLETE:
			saveTokenInBearerCookie( action );
			break;
	}

	return next( action );
};
