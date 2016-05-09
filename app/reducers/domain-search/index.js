// Internal dependencies
import {
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETED
} from 'reducers/action-types';

const initialState = {
	isFetching: false,
	results: null
};

export function domainSearch( state = initialState, action ) {
	const { results, type } = action;

	switch ( type ) {
		case DOMAIN_SUGGESTIONS_CLEAR:
			return initialState;

		case DOMAIN_SUGGESTIONS_FETCH:
			return Object.assign( {}, state, {
				isFetching: true
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
