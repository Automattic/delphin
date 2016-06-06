// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	CONNECT_USER,
	CONNECT_USER_CLEAR,
	CONNECT_USER_COMPLETE,
	CONNECT_USER_FAIL,
	CONNECT_USER_WARNING,
	FETCH_USER,
	FETCH_USER_COMPLETE,
	FETCH_USER_FAIL,
	LOGOUT_USER,
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
		firstName: null,
		lastName: null,
		twoFactorAuthenticationEnabled: null
	}
};

export const user = ( state = initialState, action ) => {
	const {
		bearerToken,
		email,
		firstName,
		intention,
		lastName,
		locale,
		notice,
		twoFactorAuthenticationEnabled,
		type
	} = action;

	switch ( type ) {
		case CONNECT_USER:
			return merge( {}, state, {
				data: { email },
				isRequesting: true,
				intention
			} );

		case CONNECT_USER_CLEAR:
			return Object.assign( {}, state, {
				wasCreated: false
			} );

		case CONNECT_USER_COMPLETE:
			return merge( {}, state, {
				data: { email, twoFactorAuthenticationEnabled },
				isRequesting: false,
				wasCreated: true
			} );

		case CONNECT_USER_FAIL:
			return Object.assign( {}, state, {
				isRequesting: false,
				wasCreated: false
			} );

		case CONNECT_USER_WARNING:
			return merge( {}, state, {
				data: { notice }
			} );

		case FETCH_USER:
			return Object.assign( {}, state, {
				isRequesting: true
			} );

		case FETCH_USER_COMPLETE:
			return merge( {}, state, {
				isLoggedIn: true,
				isRequesting: false,
				data: {
					bearerToken,
					firstName,
					lastName,
					email,
					locale
				}
			} );

		case FETCH_USER_FAIL:
			return initialState;

		case LOGOUT_USER:
			return initialState;

		case VERIFY_USER:
			return Object.assign( {}, state, {
				isRequesting: true
			} );

		case VERIFY_USER_COMPLETE:
			return merge( {}, state, {
				isRequesting: false,
				data: {
					bearerToken
				}
			} );

		case VERIFY_USER_FAIL:
			return Object.assign( {}, state, {
				isLoggedIn: false,
				isRequesting: false
			} );

		default:
			return state;
	}
};
