// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	COUNTRIES_FETCH,
	COUNTRIES_FETCH_COMPLETE,
	COUNTRIES_FETCH_ERROR,
	WPCOM_REQUEST
} from 'reducers/action-types';

export const fetchCountries = () => ( {
	type: WPCOM_REQUEST,
	params: { path: '/me/transactions/supported-countries' },
	loading: COUNTRIES_FETCH,
	success: data => ( { type: COUNTRIES_FETCH_COMPLETE, data } ),
	fail: error => (
		dispatch => {
			dispatch( addNotice( {
				message: error.message,
				status: 'error'
			} ) );

			dispatch( { type: COUNTRIES_FETCH_ERROR, error: error.message } );
		}
	)
} );
