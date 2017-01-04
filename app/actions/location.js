// Internal dependencies
import {
	USER_LOCATION_FETCH,
	USER_LOCATION_FETCH_COMPLETE,
	USER_LOCATION_FETCH_FAIL,
	WPCOM_REQUEST
} from 'reducers/action-types';

export const fetchLocation = () => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	loading: USER_LOCATION_FETCH,
	params: {
		apiNamespace: 'geo/',
		path: ''
	},
	fail: () => ( {
		type: USER_LOCATION_FETCH_FAIL
	} ),
	success: data => ( {
		type: USER_LOCATION_FETCH_COMPLETE,
		countryCode: data.countryShort
	} )
} );
