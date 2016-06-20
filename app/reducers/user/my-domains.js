// Internal dependencies
import {
	MY_DOMAINS_FETCH,
	MY_DOMAINS_FETCH_COMPLETE,
	MY_DOMAINS_FETCH_FAIL
} from 'reducers/action-types';

export const initialState = {
	isRequesting: false,
	hasLoadedFromServer: false,
	data: null
};

export const myDomains = ( state = initialState, action ) => {
	const { type, results } = action;

	switch ( type ) {
		case MY_DOMAINS_FETCH:
			return Object.assign( {}, state, {
				hasLoadedFromServer: false,
				isRequesting: true,
				data: []
			} );

		case MY_DOMAINS_FETCH_COMPLETE:
			return Object.assign( {}, state, {
				hasLoadedFromServer: true,
				isRequesting: false,
				data: results
			} );

		case MY_DOMAINS_FETCH_FAIL:
			return initialState;

		default:
			return state;
	}
};
