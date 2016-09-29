// Internal dependencies
import {
	SECTION_FETCH,
	SECTION_FETCH_COMPLETE,
} from 'reducers/action-types';

export const sectionIsFetching = section => ( { type: SECTION_FETCH, section } );
export const sectionWasFetched = section => ( { type: SECTION_FETCH_COMPLETE, section } );
