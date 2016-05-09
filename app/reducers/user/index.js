// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	CONNECT_USER,
	CONNECT_USER_COMPLETE,
	CONNECT_USER_FAIL,
	CONNECT_USER_WARNING,
	REMOVE_USER,
	VERIFY_USER,
	VERIFY_USER_COMPLETE,
	VERIFY_USER_FAIL
} from 'reducers/action-types';

export const initialState = {
	intention: null,
	isLoggedIn: false,
	isUpdating: false,
	wasCreated: false,
	data: {
		bearerToken: null,
		email: null,
		twoFactorAuthenticationEnabled: null
	}
};

export const user = ( state = initialState, action ) => {
	const { bearerToken, email, intention, notice, type, twoFactorAuthenticationEnabled } = action;

	switch ( type ) {
		case CONNECT_USER:
			return merge( {}, state, {
				data: { email },
				isUpdating: true,
				intention
			} );

		case CONNECT_USER_COMPLETE:
			return merge( {}, state, {
				data: { email, twoFactorAuthenticationEnabled },
				isUpdating: false,
				wasCreated: true
			} );

		case CONNECT_USER_FAIL:
			return merge( {}, state, {
				isUpdating: false,
				wasCreated: false
			} );

		case CONNECT_USER_WARNING:
			return merge( {}, state, {
				data: { notice }
			} );

		case REMOVE_USER:
			return initialState;

		case VERIFY_USER:
			return merge( {}, state, {
				isUpdating: true
			} );

		case VERIFY_USER_COMPLETE:
			return merge( {}, state, {
				isLoggedIn: true,
				isUpdating: false,
				data: {
					bearerToken
				}
			} );

		case VERIFY_USER_FAIL:
			return merge( {}, state, {
				isLoggedIn: false,
				isUpdating: false
			} );

		default:
			return state;
	}
};
