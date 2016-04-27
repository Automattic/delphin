// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	CREATE_USER_WITHOUT_PASSWORD,
	CREATE_USER_WITHOUT_PASSWORD_COMPLETE,
	VERIFY_USER,
	VERIFY_USER_COMPLETE
} from 'reducers/action-types';

export const initialState = {
	isLoggedIn: false,
	isUpdating: false,
	wasCreated: false,
	data: {
		bearerToken: null,
		email: null
	}
};

export const user = ( state = initialState, action ) => {
	const { bearerToken, email, type } = action;

	switch ( type ) {
		case CREATE_USER_WITHOUT_PASSWORD:
			return merge( {}, state, {
				data: { email }, isUpdating: true
			} );
		case CREATE_USER_WITHOUT_PASSWORD_COMPLETE:
			return merge( {}, state, {
				data: { email }, isUpdating: false, wasCreated: true
			} );
		case VERIFY_USER:
			return merge( {}, state, { isUpdating: true } );
		case VERIFY_USER_COMPLETE:
			return merge( {}, state, {
				isLoggedIn: true,
				isUpdating: false,
				data: {
					bearerToken
				}
			} );
		default:
			return state;
	}
};
