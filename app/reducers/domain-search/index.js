// Internal dependencies
import {
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
	DOMAIN_SUGGESTIONS_FETCH_FAIL
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
				isFetching: true,
				results: null
			} );

		case DOMAIN_SUGGESTIONS_FETCH_COMPLETE:
			return Object.assign( {}, state, {
				isFetching: false,
				results: results
			} );

		case DOMAIN_SUGGESTIONS_FETCH_FAIL:
			return Object.assign( {}, state, {
				isFetching: false
			} );

		default:
			return state;
	}
}
