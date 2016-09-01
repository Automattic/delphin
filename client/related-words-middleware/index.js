// External dependencies
import config from 'config';
import difference from 'lodash/difference';
import request from 'superagent';
import i18n from 'i18n-calypso';

// Internal dependencies
import { getKeywords, getRelatedWords } from 'reducers/ui/domain-search/selectors';
import {
	DOMAIN_SUGGESTIONS_FETCH,
	RELATED_WORD_FETCH,
	RELATED_WORD_FETCH_COMPLETE,
	RELATED_WORD_FETCH_FAIL,
} from 'reducers/action-types';
import { isDomain } from 'lib/domains';
import { shouldTranslateWord, translateWord } from 'lib/translate';

function requestRelatedWords( word ) {
	// Wordnik does not return related words for uppercase words
	word = word.toLowerCase();

	return new Promise( ( resolve, reject ) => {
		request
			.get( `https://api.wordnik.com/v4/word.json/${ encodeURIComponent( word ) }/relatedWords` +
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
			locale = i18n.getLocaleSlug(),
			keywords = getKeywords( state ).map( keyword => keyword.value ),
			existingRelatedWords = getRelatedWords( state ).map( relatedWord => relatedWord.word ),
			wordsToFetch = difference( keywords, existingRelatedWords );

		wordsToFetch.filter( word => ! isDomain( word ) ).forEach( originalWord => {
			store.dispatch( {
				type: RELATED_WORD_FETCH,
				word: originalWord
			} );

			new Promise( ( resolve ) => {
				// If we're on non english site or the word has non english alphabet - translate it
				if ( shouldTranslateWord( originalWord ) ) {
					resolve( translateWord( originalWord, 'en' ) );
				}

				return resolve( { word: originalWord, sourceLanguage: 'en' } );
			} )
			.then( ( translation ) => requestRelatedWords( translation.word )
					.then( ( relatedWords ) => ( { relatedWords, sourceLanguage: translation.sourceLanguage } ) )
			)
			.then( params => {
				const { relatedWords } = params;

				// We should translate the related words according to user's locale
				if ( ! locale || locale === 'en' ) {
					return relatedWords;
				}

				return Promise.all( relatedWords.map( englishWord => translateWord( englishWord, locale, 'en' ) ) )
					.then( ( translations ) => translations.map( ( translation ) => translation.word ) );
			} )
			.then( words =>	store.dispatch( {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: originalWord,
				data: words
			} ) ).catch( () => store.dispatch( {
				type: RELATED_WORD_FETCH_FAIL,
				word: originalWord
			} ) );
		} );
	}

	return next( action );
};
