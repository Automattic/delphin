// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	FETCH_USER,
	FETCH_USER_COMPLETE,
	FETCH_USER_FAIL,
	LOGOUT_USER
} from 'reducers/action-types';

export const initialState = {
	isRequesting: false,
	hasLoadedFromServer: false,
	data: null
};

export const settings = ( state = initialState, action ) => {
	const {
		email,
		id,
		locale,
		username,
		type
	} = action;

	switch ( type ) {
		case FETCH_USER:
			return Object.assign( {}, state, {
				isRequesting: true
			} );

		case FETCH_USER_COMPLETE:
			return merge( {}, state, {
				hasLoadedFromServer: true,
				isRequesting: false,
				data: {
					email,
					id,
					locale,
					username,
				}
			} );

		case FETCH_USER_FAIL:
		case LOGOUT_USER:
			return initialState;

		default:
			return state;
	}
};
