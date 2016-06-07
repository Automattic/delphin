// Internal dependencies
import { camelize } from 'lib/formatters';
import {
	CONTACT_INFORMATION_FETCH,
	CONTACT_INFORMATION_FETCH_COMPLETE,
	LOGOUT_USER
} from 'reducers/action-types';

export const initialState = {
	isRequesting: false,
	hasLoadedFromServer: false,
	data: null
};

export const contactInformation = ( state = initialState, action ) => {
	const { data, type } = action;

	switch ( type ) {
		case CONTACT_INFORMATION_FETCH:
			return Object.assign( {}, state, { isRequesting: true } );

		case CONTACT_INFORMATION_FETCH_COMPLETE:
			return Object.assign( {}, state, {
				isRequesting: false,
				hasLoadedFromServer: true,
				data: camelize( data )
			} );

		case LOGOUT_USER:
			return initialState;

		default:
			return state;
	}
};
