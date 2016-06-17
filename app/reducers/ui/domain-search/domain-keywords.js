// External dependencies
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_KEYWORD_SELECT,
	DOMAIN_SEARCH_KEYWORD_DESELECT,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
	DOMAIN_SEARCH_KEYWORD_REPLACE_SELECTED,
	DOMAIN_SEARCH_SUBMIT
} from 'reducers/action-types';
import { getPath } from 'routes';

const initialState = {
	inputValue: '',
	keywords: []
};

const initialKeywordState = {
	value: '',
	isSelected: false
};

const isValidKeyword = value => typeof value === 'string' && value.trim().length > 0;
const getKeywordFromValue = value => ( Object.assign( {}, initialKeywordState, { value: value.trim() } ) );

const addKeyword = ( state, value ) => {
	value = value.trim();

	// if we already have that keyword, no need to add it.
	if ( find( state.keywords, keyword => keyword.value === value ) ) {
		return Object.assign( {}, state, { inputValue: '' } );
	}

	return Object.assign( {}, state, {
		inputValue: '',
		keywords: state.keywords.concat( getKeywordFromValue( value ) )
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
						keywords: queryKeywords.map( getKeywordFromValue )
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
			return Object.assign( {}, state, {
				keywords: state.keywords.map( keyword => {
					return Object.assign( {}, keyword, { isSelected: keyword.value === value } );
				} )
			} );

		case DOMAIN_SEARCH_KEYWORD_DESELECT:
			return Object.assign( {}, state, {
				keywords: state.keywords.map( keyword => {
					return Object.assign( {}, keyword, { isSelected: false } );
				} )
			} );

		case DOMAIN_SEARCH_KEYWORD_REMOVE:
			return Object.assign( {}, state, {
				keywords: state.keywords.filter( keyword => keyword.value !== value )
			} );

		case DOMAIN_SEARCH_KEYWORD_REPLACE_SELECTED:
			if ( isValidKeyword( value ) ) {
				const selectedKeyword = find( state.keywords, keyword => keyword.isSelected );

				if ( ! selectedKeyword ) {
					return state;
				}

				const existingKeyword = find( state.keywords, keyword => keyword.value === value.trim() );

				if ( existingKeyword ) {
					return state;
				}

				return Object.assign( {}, state, {
					keywords: state.keywords.map( keyword => keyword === selectedKeyword ? getKeywordFromValue( value ) : keyword )
				} );
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

		default:
			return state;
	}
}
