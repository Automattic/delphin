// Internal dependencies
import {
	USER_LOCATION_FETCH,
	USER_LOCATION_FETCH_COMPLETE
} from 'reducers/action-types';

export const initialState = {
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

		default:
			return state;
	}
};
