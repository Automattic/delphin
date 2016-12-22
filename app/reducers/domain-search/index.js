// Internal dependencies
import {
	DOMAIN_SEARCH_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
	DOMAIN_SUGGESTIONS_FETCH_FAIL
} from 'reducers/action-types';

const initialState = {
	hasLoadedFromServer: false,
	isRequesting: false,
	results: null,
	query: null
};

export function domainSearch( state = initialState, action ) {
	const { results, query, type } = action;

	switch ( type ) {
		case DOMAIN_SEARCH_CLEAR:
			return initialState;

		case DOMAIN_SUGGESTIONS_FETCH:
			return Object.assign( {}, state, {
				hasLoadedFromServer: false,
				isRequesting: true,
				results: null,
				query
			} );

		case DOMAIN_SUGGESTIONS_FETCH_COMPLETE:
			if ( query !== state.query ) {
				// this is a stale response, ignore it
				return state;
			}

			return Object.assign( {}, state, {
				hasLoadedFromServer: true,
				isRequesting: false,
				results: results
			} );

		case DOMAIN_SUGGESTIONS_FETCH_FAIL:
			return Object.assign( {}, state, {
				isRequesting: false
			} );

		default:
			return state;
	}
}
