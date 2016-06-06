// External dependencies
import config from 'config';
import difference from 'lodash/difference';
import request from 'superagent';

// Internal dependencies
import { getKeywords, getRelatedWords } from 'reducers/ui/domain-search/selectors';
import {
	DOMAIN_SUGGESTIONS_FETCH,
	RELATED_WORD_FETCH,
	RELATED_WORD_FETCH_COMPLETE
} from 'reducers/action-types';
import { isDomain } from 'lib/domains';

export const relatedWordsMiddleware = store => next => action => {
	if ( action.type === DOMAIN_SUGGESTIONS_FETCH ) {
		const state = store.getState(),
			keywords = getKeywords( state ).map( keyword => keyword.value ),
			existingRelatedWords = getRelatedWords( state ).map( relatedWord => relatedWord.word ),
			wordsToFetch = difference( keywords, existingRelatedWords );

		wordsToFetch.filter( word => ! isDomain( word ) ).forEach( word => {
			store.dispatch( {
				type: RELATED_WORD_FETCH,
				word
			} );

			request
				.get( `https://api.wordnik.com/v4/word.json/${ word }/relatedWords` +
					'?useCanonical=true' +
					'&relationshipTypes=same-context,synonym' +
					'&limitPerRelationshipType=3' +
					`&api_key=${ config( 'wordnik_api_key' ) }` )
				.end( ( error, response ) => {
					const data = response.body.reduce( ( result, current ) => result.concat( current.words ), [] );

					store.dispatch( {
						type: RELATED_WORD_FETCH_COMPLETE,
						word,
						data
					} );
				} );
		} );
	}

	return next( action );
};
