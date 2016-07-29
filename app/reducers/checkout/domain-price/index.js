// Internal dependencies
import {
	DOMAIN_PRICE_CLEAR,
	DOMAIN_PRICE_FETCH,
	DOMAIN_PRICE_FETCH_COMPLETE,
	DOMAIN_PRICE_FETCH_FAIL,
	DOMAIN_SELECT
} from 'reducers/action-types';

const initialState = {
	hasLoadedFromServer: false,
	isRequesting: false,
	data: null,
	query: null
};

export function domainPrice( state = initialState, action ) {
	const { result, query, type } = action;

	switch ( type ) {
		case DOMAIN_SELECT:
		case DOMAIN_PRICE_CLEAR:
			return initialState;

		case DOMAIN_PRICE_FETCH:
			return Object.assign( {}, state, {
				hasLoadedFromServer: false,
				isRequesting: true,
				data: null,
				query
			} );

		case DOMAIN_PRICE_FETCH_COMPLETE:
			if ( query !== state.query ) {
				// this is a stale response, ignore it
				return state;
			}

			return Object.assign( {}, state, {
				hasLoadedFromServer: true,
				isRequesting: false,
				data: result
			} );

		case DOMAIN_PRICE_FETCH_FAIL:
			return Object.assign( {}, state, {
				isRequesting: false
			} );

		default:
			return state;
	}
}
