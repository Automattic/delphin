import { DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT } from 'reducers/action-types';

const initialState = {
	showEmptySearchNotice: false
};

export const domainSearch = ( state = initialState, action ) => {
	const { type } = action;

	switch ( type ) {
		case DOMAIN_SEARCH_EMPTY_SEARCH_SUBMIT:
			return Object.assign( {}, state, { showEmptySearchNotice: true } );

		default:
			return state;
	}
};
