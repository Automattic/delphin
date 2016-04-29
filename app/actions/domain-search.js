// External dependencies
import WPCOM from 'wpcom';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	DOMAIN_SELECT,
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETED
} from 'reducers/action-types';

const wpcomAPI = WPCOM();

/**
 * Returns an action object to be used in signalling that domain suggestions have been cleared.
 *
 * @returns {Object} the corresponding action object
 */
export function clearDomainSuggestions() {
	return {
		type: DOMAIN_SUGGESTIONS_CLEAR
	};
}
export function fetchDomainSuggestions( query ) {
	if ( query.trim() === '' ) {
		return dispatch => {
			dispatch( clearDomainSuggestions() );
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
				return dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );
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
