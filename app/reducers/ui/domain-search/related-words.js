// External dependencies
import find from 'lodash/find';
import union from 'lodash/union';

// Internal dependencies
import {
	RELATED_WORD_FETCH,
	RELATED_WORD_FETCH_COMPLETE,
	RELATED_WORD_FETCH_FAIL,
} from 'reducers/action-types';

const initialRelatedWordsState = {
	word: null,
	data: null,
	isRequesting: false,
	hasLoadedFromServer: false
};

const addRelatedWord = ( state, word, properties ) => {
	if ( find( state, { word } ) ) {
		return state.map( relatedWord => {
			if ( relatedWord.word === word ) {
				return Object.assign( {}, relatedWord, properties );
			}
			return relatedWord;
		} );
	}

	return state.concat( Object.assign(
			{},
			initialRelatedWordsState,
			properties,
			{ word }
	) );
};

export default function relatedWords( state = [], action ) {
	const { type, word, data } = action;

	switch ( type ) {
		case RELATED_WORD_FETCH:
			return addRelatedWord( state, word, {
				isRequesting: true
			} );

		case RELATED_WORD_FETCH_COMPLETE:
			return addRelatedWord( state, word, {
				data: union( data ),
				isRequesting: false,
				hasLoadedFromServer: true
			} );

		case RELATED_WORD_FETCH_FAIL:
			return addRelatedWord( state, word, {
				isRequesting: false
			} );

		default:
			return state;
	}
}
