// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	CONNECT_USER,
	CONNECT_USER_CLEAR,
	CONNECT_USER_COMPLETE,
	CONNECT_USER_FAIL,
	CONNECT_USER_WARNING,
	VERIFY_USER,
	VERIFY_USER_COMPLETE,
	VERIFY_USER_FAIL
} from 'reducers/action-types';

const initialState = {
	intention: null,
	isRequesting: false,
	wasCreated: false,
	data: {
		bearerToken: null,
		/**
		 * This is the email address the user enters during signup/login, and may or may not
		 * be present, or the current user's actual email address if it is.
		 * Use `state.user.settings.data.email` to obtain the logged-in user's email.
		 */
		email: null,
		notice: null,
		twoFactorAuthenticationEnabled: null
	}
};

export const connect = ( state = initialState, action ) => {
	const { type, notice, bearerToken, intention, email, twoFactorAuthenticationEnabled } = action;

	switch ( type ) {
		case CONNECT_USER:
			return merge( {}, state, {
				data: {
					email,
					notice: null
				},
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
				intention,
				isRequesting: false,
				wasCreated: true
			} );

		case CONNECT_USER_FAIL:
			return Object.assign( {}, state, {
				isRequesting: false
			} );

		case CONNECT_USER_WARNING:
			return merge( {}, state, {
				data: { notice },
				intention
			} );

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
				isRequesting: false
			} );

		default:
			return state;
	}
};
