// External dependencies
import omit from 'lodash/omit';

export const initialState = {
	hasLoadedFromServer: false,
	isRequesting: false,
	data: null,
	error: null
};

/**
 * Determines if the given action type is equal to, or in the array of, given types.
 *
 * @param {string} type - Action type
 * @param {string|array} types - Action type or array of action types
 *
 * @return {bool} - If the given type is equivalent to the given type(s).
 */
const includesAction = ( type, types ) => {
	const newTypes = Array.isArray( types ) ? types : [ types ];

	return newTypes.indexOf( type ) > -1;
};

export const createRequestReducer = ( { loading, success, fail, reset } = {}, additionalReducer = x => x ) => ( state = initialState, action ) => {
	const { type, error } = action;

	if ( loading && includesAction( type, loading ) ) {
		return Object.assign( {}, state, { isRequesting: true } );
	}

	if ( success && includesAction( type, success ) ) {
		const data = action.data ? action.data : omit( action, 'type' );

		return Object.assign( {}, state, {
			hasLoadedFromServer: true,
			isRequesting: false,
			data
		} );
	}

	if ( fail && includesAction( type, fail ) ) {
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
