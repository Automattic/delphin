// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	CONNECT_USER,
	CONNECT_USER_COMPLETE,
	CONNECT_USER_FAIL,
	CONNECT_USER_WARNING,
	FETCH_USER,
	FETCH_USER_COMPLETE,
	FETCH_USER_FAIL,
	REMOVE_USER,
	VERIFY_USER,
	VERIFY_USER_COMPLETE,
	VERIFY_USER_FAIL
} from 'reducers/action-types';

export const initialState = {
	intention: null,
	isLoggedIn: false,
	isRequesting: false,
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
				isRequesting: true,
				intention
			} );

		case CONNECT_USER_COMPLETE:
			return merge( {}, state, {
				data: { email, twoFactorAuthenticationEnabled },
				isRequesting: false,
				wasCreated: true
			} );

		case CONNECT_USER_FAIL:
			return merge( {}, state, {
				isRequesting: false,
				wasCreated: false
			} );

		case CONNECT_USER_WARNING:
			return merge( {}, state, {
				data: { notice }
			} );

		case FETCH_USER:
			return merge( {}, state, {
				isRequesting: true
			} );

		case FETCH_USER_COMPLETE:
			return merge( {}, state, {
				isLoggedIn: true,
				isRequesting: false,
				data: {
					bearerToken,
					email
				}
			} );

		case FETCH_USER_FAIL:
			return initialState;

		case REMOVE_USER:
			return initialState;

		case VERIFY_USER:
			return merge( {}, state, {
				isRequesting: true
			} );

		case VERIFY_USER_COMPLETE:
			return merge( {}, state, {
				isLoggedIn: true,
				isRequesting: false,
				data: {
					bearerToken
				}
			} );

		case VERIFY_USER_FAIL:
			return merge( {}, state, {
				isLoggedIn: false,
				isRequesting: false
			} );

		default:
			return state;
	}
};
