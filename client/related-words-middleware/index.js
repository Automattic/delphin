// External dependencies
import config from 'config';
import difference from 'lodash/difference';
import flatten from 'lodash/flatten';
import request from 'superagent';
import i18n from 'i18n-calypso';

// Internal dependencies
import { getKeywords, getRelatedWords } from 'reducers/ui/domain-search/selectors';
import { getUserLocale } from 'reducers/user/selectors';
import {
	DOMAIN_SUGGESTIONS_FETCH,
	RELATED_WORD_FETCH,
	RELATED_WORD_FETCH_COMPLETE
} from 'reducers/action-types';
import { isDomain } from 'lib/domains';
import { translateWord } from 'lib/translate';

function requestRelatedWords( word ) {
	return new Promise( ( resolve, reject ) => {
		request
			.get( `http://api.wordnik.com/v4/word.json/${ encodeURIComponent( word ) }/relatedWords` +
				'?useCanonical=true' +
				'&relationshipTypes=same-context,synonym' +
				'&limitPerRelationshipType=3' +
				`&api_key=${ config( 'wordnik_api_key' ) }` )
			.end( ( error, response ) => {
				if ( error ) {
					return reject( new Error( error ) );
				}

				resolve( response.body.reduce( ( result, current ) => result.concat( current.words ), [] ) );
			} );
	} );
}

export const relatedWordsMiddleware = store => next => action => {
	if ( action.type === DOMAIN_SUGGESTIONS_FETCH ) {
		const state = store.getState(),
			locale = getUserLocale( state ) || i18n.getLocaleSlug(),
			keywords = getKeywords( state ).map( keyword => keyword.value ),
			existingRelatedWords = getRelatedWords( state ).map( relatedWord => relatedWord.word ),
			wordsToFetch = difference( keywords, existingRelatedWords );

		wordsToFetch.filter( word => ! isDomain( word ) ).forEach( word => {
			store.dispatch( {
				type: RELATED_WORD_FETCH,
				word
			} );

			new Promise( ( resolve ) => {
				if ( ! locale || locale === 'en' ) {
					return resolve( word );
				}

				return resolve( translateWord( word, 'en', locale ) );
			} )
			.then( requestRelatedWords )
			.then( words => {
				if ( ! locale || locale === 'en' ) {
					return words;
				}

				return Promise.all( words.map( englishWord => translateWord( englishWord, locale, 'en' ) ) )
					.then( ( ...translatedWords ) => flatten( translatedWords ) );
			} )
			.then( words =>	store.dispatch( {
				type: RELATED_WORD_FETCH_COMPLETE,
				word,
				data: words
			} ) ).catch( () => store.dispatch( {
				type: RELATED_WORD_FETCH_COMPLETE,
				word,
				data: null
			} ) );
		} );
	}

	return next( action );
};
