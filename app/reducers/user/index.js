// Internal dependencies
import {
	CREATE_USER_WITHOUT_PASSWORD,
	CREATE_USER_WITHOUT_PASSWORD_COMPLETE
} from 'reducers/action-types';

export const initialState = {
	isUpdating: false,
	wasCreated: false,
	data: {
		email: null
	}
};

export const user = ( state = initialState, action ) => {
	const { email, type } = action;

	switch ( type ) {
		case CREATE_USER_WITHOUT_PASSWORD:
			return Object.assign( {}, state, {
				data: { email }, isUpdating: true
			} );
		case CREATE_USER_WITHOUT_PASSWORD_COMPLETE:
			return Object.assign( {}, state, {
				data: { email }, isUpdating: false, wasCreated: true
			} );
		default:
			return state;
	}
};
