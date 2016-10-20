// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	UPDATE_DOMAIN_COMPLETE,
	UPDATE_DOMAIN_FAIL,
	UPDATE_DOMAIN_POST
} from 'reducers/action-types';

export const updateDomain = createRequestReducer( {
	loading: UPDATE_DOMAIN_POST,
	success: UPDATE_DOMAIN_COMPLETE,
	fail: UPDATE_DOMAIN_FAIL
}, ( state, action ) => {
	const { type } = action;

	switch ( type ) {
		default:
			return state;
	}
} );

export const domain = combineReducers( {
	updateDomain
} );
