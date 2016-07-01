// External dependencies
import { combineReducers } from 'redux';
import i18n from 'i18n-calypso';

// Internal dependencies
import { PAGE_TITLE_UPDATE } from 'reducers/action-types';

function addSuffix( title ) {
	const fragments = [ i18n.translate( 'MagicDomains' ) ];

	if ( title ) {
		fragments.unshift( title );
	}

	return fragments.join( ' | ' );
}

export const title = ( state = '', action ) => {
	const { type } = action;

	switch ( type ) {
		case PAGE_TITLE_UPDATE:
			return addSuffix( action.title );

		default:
			return state;
	}
};

export default combineReducers( { title } );
