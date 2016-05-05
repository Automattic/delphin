// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	CREATE_USER_WITHOUT_PASSWORD,
	CREATE_USER_WITHOUT_PASSWORD_COMPLETE,
	CREATE_USER_WITHOUT_PASSWORD_FAIL,
	REMOVE_USER,
	VERIFY_USER,
	VERIFY_USER_COMPLETE,
	VERIFY_USER_FAIL
} from 'reducers/action-types';

export const initialState = {
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
	const { bearerToken, email, type, twoFactorAuthenticationEnabled } = action;

	switch ( type ) {
		case CREATE_USER_WITHOUT_PASSWORD:
			return merge( {}, state, {
				data: { email }, isUpdating: true
			} );
		case CREATE_USER_WITHOUT_PASSWORD_COMPLETE:
			return merge( {}, state, {
				data: { email, twoFactorAuthenticationEnabled }, isUpdating: false, wasCreated: true
			} );
		case CREATE_USER_WITHOUT_PASSWORD_FAIL:
			return merge( {}, state, {
				isUpdating: false, wasCreated: false
			} );
		case REMOVE_USER:
			return initialState;
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
		case VERIFY_USER_FAIL:
			return merge( {}, state, {
				isLoggedIn: false, isUpdating: false
			} );
		default:
			return state;
	}
};
