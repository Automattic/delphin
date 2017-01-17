// External dependencies
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import uniqueId from 'lodash/uniqueId';
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	DOMAIN_SEARCH_CLEAR,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
	DOMAIN_SEARCH_SUBMIT,
} from 'reducers/action-types';
import { getPath } from 'routes';
import { stripLocaleSlug } from 'lib/routes';

const initialState = {
	inputValue: '',
	keywords: []
};

const initialKeywordState = {
	value: '',
	id: null,
};

const isValidKeyword = value => typeof value === 'string' && value.trim().length > 0;

const createKeyword = value => (
	Object.assign( {}, initialKeywordState, { value: value.trim(), id: parseInt( uniqueId(), 10 ) } )
);

const addKeyword = ( state, value ) => {
	const { keywords } = state;

	value = value.trim();

	return Object.assign( {}, state, {
		inputValue: '',
		keywords: keywords.concat( createKeyword( value ) )
	} );
};

/**
 * Returns a new state with the specified keyword removed.
 *
 * @param {object} state - current state
 * @param {object} id - id of the keyword to remove
 * @returns {object} - the new state
 */
const removeKeyword = ( state, id ) => {
	const newKeywords = state.keywords.filter( ( keyword ) => {
		return keyword.id !== id;
	} );

	return Object.assign( {}, state, {
		keywords: newKeywords
	} );
};

export default function domainKeywords( state = initialState, action ) {
	const { type, value } = action;

	switch ( type ) {
		// sync keywords from the url if the url is different
		case LOCATION_CHANGE:
			if ( ! isEmpty( action.payload.query.q ) && stripLocaleSlug( action.payload.pathname ) === getPath( 'search' ) ) {
				const queryKeywords = action.payload.query.q.split( ' ' );

				if ( state.keywords.length !== queryKeywords.length ||
					! state.keywords.every( ( keyword, index ) => keyword.value === queryKeywords[ index ] ) ) {
					return Object.assign( {}, state, {
						keywords: queryKeywords.map( createKeyword )
					} );
				}
			}

			return state;

		case DOMAIN_SEARCH_SUBMIT:
			if ( isValidKeyword( state.inputValue ) ) {
				return addKeyword( state, state.inputValue );
			}

			return state;

		case DOMAIN_SEARCH_INPUT_CHANGE:
			if ( isValidKeyword( value ) && value.substring( value.length - 1, value.length ) === ' ' ) {
				return addKeyword( state, value );
			}

			return Object.assign( {}, state, { inputValue: value } );

		case DOMAIN_SEARCH_KEYWORD_REMOVE:
			return removeKeyword( state, action.keyword.id );

		case DOMAIN_SEARCH_LAST_KEYWORD_REMOVE:
			if ( isEmpty( state.keywords ) ) {
				return state;
			}

			const { value: keywordValue } = last( state.keywords );

			return Object.assign( {}, state, {
				inputValue: keywordValue.substring( 0, keywordValue.length - 1 ),
				keywords: state.keywords.slice( 0, state.keywords.length - 1 )
			} );

		case DOMAIN_SEARCH_CLEAR:
			return initialState;

		default:
			return state;
	}
}
