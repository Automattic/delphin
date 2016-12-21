// External dependencies
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import uniqueId from 'lodash/uniqueId';
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	DOMAIN_SEARCH_CLEAR,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_INPUT_FOCUS,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_KEYWORD_SELECT,
	DOMAIN_SEARCH_KEYWORD_DESELECT,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
	DOMAIN_SEARCH_KEYWORD_REPLACE_SELECTED,
	DOMAIN_SEARCH_SUBMIT,
} from 'reducers/action-types';
import { getPath } from 'routes';

const initialState = {
	inputValue: '',
	keywords: []
};

const initialKeywordState = {
	value: '',
	id: null,
	isSelected: false
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

/**
 * Returns a new state with the specified keyword selected.
 *
 * @param {object} state - current state
 * @param {object} id - id of the keyword to remove
 * @returns {object} - the new state
 */
const selectKeyword = ( state, id ) => {
	return Object.assign( {}, state, {
		keywords: state.keywords.map( ( keyword ) => {
			return Object.assign( {}, keyword, {
				isSelected: keyword.id === id
			} );
		} )
	} );
};

/**
 * Returns a new state with the specified keyword replaced with one or more
 * keywords from the given `newValue`.
 *
 * @param {object} state - current state
 * @param {object} id - id of the keyword to remove
 * @param {string} newValue - new value
 * @returns {object} - the new state
 */
const updateKeyword = ( state, id, newValue ) => {
	return Object.assign( {}, state, {
		keywords: state.keywords.reduce( ( keywords, keyword ) => {
			if ( keyword.id === id ) {
				const newKeywords = newValue.split( ' ' ).map( createKeyword );
				return keywords.concat( newKeywords );
			}
			return keywords.concat( keyword );
		}, [] )
	} );
};

export default function domainKeywords( state = initialState, action ) {
	const { type, value } = action;

	switch ( type ) {
		// sync keywords from the url if the url is different
		case LOCATION_CHANGE:
			if ( action.payload.pathname === getPath( 'search' ) && ! isEmpty( action.payload.query.q ) ) {
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

		case DOMAIN_SEARCH_KEYWORD_SELECT:
			return selectKeyword( state, action.keyword.id );

		case DOMAIN_SEARCH_KEYWORD_DESELECT:
			return Object.assign( {}, state, {
				keywords: state.keywords.map( keyword => {
					return Object.assign( {}, keyword, { isSelected: false } );
				} )
			} );

		case DOMAIN_SEARCH_KEYWORD_REMOVE:
			return removeKeyword( state, action.keyword.id );

		case DOMAIN_SEARCH_KEYWORD_REPLACE_SELECTED:
			if ( isValidKeyword( value ) ) {
				const selectedKeyword = find( state.keywords, keyword => keyword.isSelected );

				if ( ! selectedKeyword ) {
					return state;
				}

				return updateKeyword( state, selectedKeyword.id, value );
			}

			return state;

		case DOMAIN_SEARCH_LAST_KEYWORD_REMOVE:
			if ( isEmpty( state.keywords ) ) {
				return state;
			}

			const { value: keywordValue } = last( state.keywords );

			return Object.assign( {}, state, {
				inputValue: keywordValue.substring( 0, keywordValue.length - 1 ),
				keywords: state.keywords.slice( 0, state.keywords.length - 1 )
			} );

		case DOMAIN_SEARCH_INPUT_FOCUS:
			return Object.assign( {}, state, {
				keywords: state.keywords.map( keyword => Object.assign( {}, keyword, { isSelected: false } ) )
			} );

		case DOMAIN_SEARCH_CLEAR:
			return initialState;

		default:
			return state;
	}
}
