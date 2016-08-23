// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { CONFIRM_DOMAIN_MORE_INFORMATION_SHOW } from 'reducers/action-types';

export const moreInformationIsVisible = ( state = false, action ) => {
	const { type } = action;

	switch ( type ) {
		case CONFIRM_DOMAIN_MORE_INFORMATION_SHOW:
			return true;
		default:
			return state;
	}
};

export default combineReducers( { moreInformationIsVisible } );
