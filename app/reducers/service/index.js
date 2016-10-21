// Internal dependencies
import {
	SERVICE_FETCH,
	SERVICE_FETCH_COMPLETE,
	SERVICE_FETCH_FAIL,
} from 'reducers/action-types';

const initialState = {
	isRequesting: false,
	hasLoadedFromServer: false,
	domain: null,
	service: null
};

export const service = ( state = initialState, action ) => {
	const { type, domain, service: innerService } = action;

	switch ( type ) {
		case SERVICE_FETCH:
			return { ...state, domain, isRequesting: true };

		case SERVICE_FETCH_COMPLETE:
			return {
				...state,
				domain,
				isRequesting: false,
				hasLoadedFromServer: true,
				service: innerService
			};

		case SERVICE_FETCH_FAIL:
			return { ...state, domain, isRequesting: false };

		default:
			return state;
	}
};
