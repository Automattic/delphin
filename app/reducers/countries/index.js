// Internal dependencies
import {
	COUNTRIES_FETCH,
	COUNTRIES_FETCH_COMPLETE,
	COUNTRIES_FETCH_ERROR
} from 'reducers/action-types';

const initialState = {
	isRequesting: false,
	hasLoadedFromServer: false,
	data: null
};

export const countries = ( state = initialState, action ) => {
	const { type, data } = action;

	switch ( type ) {
		case COUNTRIES_FETCH:
			return Object.assign( {}, state, { isRequesting: true } );
		case COUNTRIES_FETCH_COMPLETE:
			return Object.assign( {}, state, {
				isRequesting: false,
				hasLoadedFromServer: true,
				data
			} );
		case COUNTRIES_FETCH_ERROR:
			return Object.assign( {}, state, {
				isRequesting: false
			} );
		default:
			return state;
	}
};

