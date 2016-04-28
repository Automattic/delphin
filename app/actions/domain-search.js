// External dependencies
import WPCOM from 'wpcom';

// Internal dependencies
import {
	DOMAIN_SELECT,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETED
} from 'reducers/action-types';

const wpcomAPI = WPCOM();

export function fetchDomainSuggestions( query ) {
	if ( query.trim() === '' ) {
		return dispatch => {
			dispatch( {
				type: DOMAIN_SUGGESTIONS_FETCH_COMPLETED,
				results: []
			} );
		};
	}

	return dispatch => {
		dispatch( { type: DOMAIN_SUGGESTIONS_FETCH } );

		const payload = {
			query,
			quantity: 10,
			include_wordpressdotcom: false
		};

		wpcomAPI.req.get( '/domains/suggestions', payload, ( error, results ) => {
			if ( error ) {
				return;
			}

			dispatch( {
				type: DOMAIN_SUGGESTIONS_FETCH_COMPLETED,
				results
			} );
		} );
	};
}

export function selectDomain( domain ) {
	return {
		type: DOMAIN_SELECT,
		domain
	};
}
