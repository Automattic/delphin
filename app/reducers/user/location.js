// Internal dependencies
import {
	USER_LOCATION_FETCH,
	USER_LOCATION_FETCH_COMPLETE,
	USER_LOCATION_FETCH_FAIL
} from 'reducers/action-types';

export const initialState = {
	hasFailedToLoad: false,
	hasLoadedFromServer: false,
	isRequesting: false,
	data: null
};

export const location = ( state = initialState, action ) => {
	const { type, countryCode } = action;

	switch ( type ) {
		case USER_LOCATION_FETCH:
			return Object.assign( {}, state, { isRequesting: true } );

		case USER_LOCATION_FETCH_COMPLETE:
			return Object.assign( {}, state, {
				hasLoadedFromServer: true,
				isRequesting: false,
				data: { countryCode }
			} );

		case USER_LOCATION_FETCH_FAIL:
			return Object.assign( {}, state, {
				hasFailedToLoad: true,
				isRequesting: false
			} );

		default:
			return state;
	}
};
