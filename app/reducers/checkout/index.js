// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	DOMAIN_SELECT,
	PAYGATE_CONFIGURATION_FETCH,
	PAYGATE_CONFIGURATION_FETCH_COMPLETE,
	PAYGATE_CONFIGURATION_FETCH_FAIL,
	PAYGATE_TOKEN_CREATE,
	PAYGATE_TOKEN_CREATE_COMPLETE,
	PAYGATE_TOKEN_CREATE_FAIL,
	TRANSACTION_CREATE,
	TRANSACTION_CREATE_COMPLETE,
	TRANSACTION_CREATE_FAIL
} from 'reducers/action-types';

export const selectedDomain = ( state = {}, action ) => {
	const { type } = action;

	switch ( type ) {
		case DOMAIN_SELECT:
			return {
				domain: action.value && action.value.domain_name,
				cost: action.value && action.value.cost
			};

		default:
			return state;
	}
};

const paygateConfiguration = createRequestReducer( {
	loading: PAYGATE_CONFIGURATION_FETCH,
	success: PAYGATE_CONFIGURATION_FETCH_COMPLETE,
	fail: PAYGATE_CONFIGURATION_FETCH_FAIL
} );

const paygateToken = createRequestReducer( {
	loading: PAYGATE_TOKEN_CREATE,
	success: PAYGATE_TOKEN_CREATE_COMPLETE,
	fail: PAYGATE_TOKEN_CREATE_FAIL
} );

const transaction = createRequestReducer( {
	loading: TRANSACTION_CREATE,
	success: TRANSACTION_CREATE_COMPLETE,
	fail: TRANSACTION_CREATE_FAIL
} );

export const checkout = combineReducers( {
	paygateConfiguration,
	paygateToken,
	transaction,
	selectedDomain
} );
