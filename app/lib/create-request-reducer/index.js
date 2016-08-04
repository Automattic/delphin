// External dependencies
import { camelizeKeys } from 'lib/formatters';
import omit from 'lodash/omit';

export const initialState = {
	hasLoadedFromServer: false,
	isRequesting: false,
	data: null,
	error: null
};

export const createRequestReducer = ( { loading, success, fail, reset } = {}, additionalReducer = x => x ) => ( state = initialState, action ) => {
	const { type, error } = action;

	if ( loading && type === loading ) {
		return Object.assign( {}, state, { isRequesting: true } );
	}

	if ( success && type === success ) {
		const data = camelizeKeys( action.data ? action.data : omit( action, 'type' ) );

		return Object.assign( {}, state, {
			hasLoadedFromServer: true,
			isRequesting: false,
			data
		} );
	}

	if ( fail && type === fail ) {
		return Object.assign( {}, state, {
			isRequesting: false,
			error
		} );
	}

	if ( reset && type === reset ) {
		return initialState;
	}

	return additionalReducer( state, action );
};
