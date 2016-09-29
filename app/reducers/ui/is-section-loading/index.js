// Internal dependencies
import {
	SECTION_FETCH,
	SECTION_FETCH_COMPLETE,
} from 'reducers/action-types';

const isSectionLoading = ( state = {}, action ) => {
	const { type, section } = action;

	switch ( type ) {
		case SECTION_FETCH:
			return Object.assign( {}, state, { [ section ]: true } );

		case SECTION_FETCH_COMPLETE:
			return Object.assign( {}, state, { [ section ]: false } );

		default:
			return state;
	}
};

export default isSectionLoading;
