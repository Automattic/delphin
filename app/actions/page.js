// Internal dependencies
import { PAGE_TITLE_UPDATE } from 'reducers/action-types';

export const updatePageTitle = ( title ) => ( {
	type: PAGE_TITLE_UPDATE,
	title
} );
