// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import {
	FETCH_USER_COMPLETE,
	LOGOUT_USER
} from 'reducers/action-types';
import { connect } from './connect';
import { location } from './location';
import { settings } from './settings';

export const isLoggedIn = ( state = false, action ) => {
	const { type } = action;

	switch ( type ) {
		case FETCH_USER_COMPLETE:
			return true;

		case LOGOUT_USER:
			return false;

		default:
			return state;
	}
};

export const user = combineReducers( {
	connect,
	isLoggedIn,
	location,
	settings
} );
