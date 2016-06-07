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
	RELATED_WORD_FETCH_COMPLETE
} from 'reducers/action-types';
import { isDomain } from 'lib/domains';
import { isEnglishWord, translateWord } from 'lib/translate';
import { getUserLocale } from 'reducers/user/selectors';

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

		wordsToFetch.filter( word => ! isDomain( word ) ).forEach( originalWord => {
			store.dispatch( {
				type: RELATED_WORD_FETCH,
				word: originalWord
			} );

			new Promise( ( resolve ) => {
				// If we're on non english site or the word has non english alphabet - translate it
				if ( ( locale && locale !== 'en' ) || ! isEnglishWord( originalWord ) ) {
					resolve( translateWord( originalWord, 'en' ) );
				}

				return resolve( { word: originalWord, sourceLanguage: 'en' } );
			} )
			.then( ( translation ) => requestRelatedWords( translation.word )
					.then( ( relatedWords ) => ( { relatedWords, sourceLanguage: translation.sourceLanguage } ) )
			)
			.then( params => {
				const { relatedWords, sourceLanguage } = params;

				// if the original word was in english, we shouldn't translate the related words
				if ( sourceLanguage === 'en' ) {
					return relatedWords;
				}

				return Promise.all( relatedWords.map( englishWord => translateWord( englishWord, sourceLanguage, 'en' ) ) )
					.then( ( translations ) => translations.map( ( translation ) => translation.word ) );
			} )
			.then( words =>	store.dispatch( {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: originalWord,
				data: words
			} ) ).catch( ( error ) => store.dispatch( {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: originalWord,
				data: null,
				error: error.toString()
			} ) );
		} );
	}

	return next( action );
};
