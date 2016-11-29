// External dependencies
import isEqual from 'lodash/isEqual';

// Internal dependencies
import { createRequestReducer } from 'lib/create-request-reducer';
import {
	DOMAIN_AVAILABILITY_FETCH,
	DOMAIN_AVAILABILITY_FETCH_COMPLETE,
	DOMAIN_AVAILABILITY_FETCH_FAIL,
} from 'reducers/action-types';

const requestReducer = createRequestReducer( {
	loading: DOMAIN_AVAILABILITY_FETCH,
	success: DOMAIN_AVAILABILITY_FETCH_COMPLETE,
	fail: DOMAIN_AVAILABILITY_FETCH_FAIL
} );

export const domainAvailability = ( state = {}, action ) => {
	const { domainName } = action;

	if ( ! domainName ) {
		return state;
	}

	const domainState = requestReducer( state[ domainName ], action );

	if ( isEqual( state[ domainName ], domainState ) ) {
		return state;
	}

	return { ...state, [ domainName ]: domainState };
};
