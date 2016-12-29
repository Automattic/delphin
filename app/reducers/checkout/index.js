// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	CHECKOUT_REQUESTS_RESET,
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

import { selectedDomain } from './selected-domain';

const paygateConfiguration = createRequestReducer( {
	loading: PAYGATE_CONFIGURATION_FETCH,
	success: PAYGATE_CONFIGURATION_FETCH_COMPLETE,
	fail: PAYGATE_CONFIGURATION_FETCH_FAIL,
} );

const paygateToken = createRequestReducer( {
	loading: PAYGATE_TOKEN_CREATE,
	success: PAYGATE_TOKEN_CREATE_COMPLETE,
	fail: PAYGATE_TOKEN_CREATE_FAIL,
	reset: CHECKOUT_REQUESTS_RESET,
} );

const transaction = createRequestReducer( {
	loading: TRANSACTION_CREATE,
	success: TRANSACTION_CREATE_COMPLETE,
	fail: TRANSACTION_CREATE_FAIL,
	reset: CHECKOUT_REQUESTS_RESET,
} );

export const checkout = combineReducers( {
	paygateConfiguration,
	paygateToken,
	transaction,
	selectedDomain
} );
