// Internal dependencies
import { camelizeKeys } from 'lib/formatters';
import {
	CONTACT_INFORMATION_FETCH,
	CONTACT_INFORMATION_FETCH_COMPLETE,
	LOGOUT_USER
} from 'reducers/action-types';

export const initialState = {
	isRequesting: false,
	isValidating: false,
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
				data: camelizeKeys( data )
			} );

		case 'redux-form/START_ASYNC_VALIDATION':
			if ( action.form === 'contactInformation' ) {
				return Object.assign( {}, state, { isValidating: true } );
			}

			return state;

		case 'redux-form/STOP_ASYNC_VALIDATION':
			if ( action.form === 'contactInformation' ) {
				return Object.assign( {}, state, { isValidating: false } );
			}

			return state;

		case LOGOUT_USER:
			return initialState;

		default:
			return state;
	}
};
