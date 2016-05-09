// Internal dependencies
import {
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETED
} from 'reducers/action-types';

const initialState = {
	hasSearched: false,
	isFetching: false,
	results: null
};

export function domainSearch( state = initialState, action ) {
	const { results, type, query } = action;

	switch ( type ) {
		case DOMAIN_SUGGESTIONS_CLEAR:
			return initialState;

		case DOMAIN_SUGGESTIONS_FETCH:
			return Object.assign( {}, state, {
				hasSearched: true,
				isFetching: Boolean( query )
			} );

		case DOMAIN_SUGGESTIONS_FETCH_COMPLETED:
			if ( ! state.isFetching ) {
				// this action is from a stale callback
				return state;
			}

			return Object.assign( {}, state, {
				isFetching: false,
				results: results
			} );

		default:
			return state;
	}
}
