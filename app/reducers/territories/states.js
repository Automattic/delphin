// External dependencies
import merge from 'lodash/merge';

// Internal dependencies
import {
	STATES_FETCH,
	STATES_FETCH_COMPLETE,
	STATES_FETCH_ERROR
} from 'reducers/action-types';

export const states = ( state = {}, action ) => {
	const { type, data, countryCode } = action;

	switch ( type ) {
		case STATES_FETCH:
			return merge( {}, state, {
				[ countryCode ]: {
					isRequesting: true
				}
			} );

		case STATES_FETCH_COMPLETE:
			return merge( {}, state, {
				[ countryCode ]: {
					isRequesting: false,
					hasLoadedFromServer: true,
					data
				}
			} );

		case STATES_FETCH_ERROR:
			return merge( {}, state, {
				[ countryCode ]: {
					isRequesting: false
				}
			} );

		default:
			return state;
	}
};

