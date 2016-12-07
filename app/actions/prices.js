// Internal dependencies
import {
	PRICES_FETCH,
	PRICES_FETCH_COMPLETE,
	PRICES_FETCH_FAIL,
	WPCOM_REQUEST,
} from 'reducers/action-types';

export const fetchPrices = () => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/prices'
	},
	loading: { type: PRICES_FETCH },
	success: data => ( {
		type: PRICES_FETCH_COMPLETE,
		data
	} ),
	fail: () => ( {
		type: PRICES_FETCH_FAIL
	} )
} );
