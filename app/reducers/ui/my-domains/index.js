// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import {
	MY_DOMAINS_DETAILS_SHOW,
	MY_DOMAINS_DETAILS_HIDE
} from 'reducers/action-types';

export const detailsVisibilityInitialState = {};

export const detailsVisibility = ( state = detailsVisibilityInitialState, action ) => {
	const { type, domainName } = action;

	switch ( type ) {
		case MY_DOMAINS_DETAILS_SHOW:
			return { [ domainName ]: true };

		case MY_DOMAINS_DETAILS_HIDE:
			return detailsVisibilityInitialState;

		default:
			return state;
	}
};

export const myDomains = combineReducers( { detailsVisibility } );
