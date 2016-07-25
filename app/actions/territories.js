// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH,
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_COMPLETE,
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_ERROR,
	STATES_FETCH,
	STATES_FETCH_COMPLETE,
	STATES_FETCH_ERROR,
	WPCOM_REQUEST
} from 'reducers/action-types';
import { getStates } from 'reducers/territories/selectors';

export const fetchCountries = () => ( {
	type: WPCOM_REQUEST,
	params: { path: '/domains/supported-countries' },
	loading: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH,
	success: data => ( { type: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_COMPLETE, data } ),
	fail: error => (
		dispatch => {
			dispatch( addNotice( {
				message: error.message,
				status: 'error'
			} ) );

			dispatch( { type: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_ERROR } );
		}
	)
} );

export const fetchStates = ( countryCode ) => {
	return ( dispatch, getState ) => {
		const states = getStates( getState(), countryCode );

		// Fetches the list of states for a given country only once
		if ( states.hasLoadedFromServer ) {
			return;
		}

		dispatch( {
			type: WPCOM_REQUEST,
			params: { path: `/domains/supported-states/${ countryCode }` },
			loading: { type: STATES_FETCH, countryCode },
			success: data => ( { type: STATES_FETCH_COMPLETE, countryCode, data } ),
			fail: error => (
				innerDispatch => {
					innerDispatch( addNotice( {
						message: error.message,
						status: 'error'
					} ) );

					innerDispatch( { type: STATES_FETCH_ERROR, countryCode } );
				}
			)
		} );
	};
};
