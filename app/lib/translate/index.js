// External dependencies
import request from 'superagent';
import config from 'config';
import memoize from 'lodash/memoize';

/***
 * Requests a word translation from an API
 * @param {String} word the word needs to be translated
 * @param {String} targetLanguage the target language
 * @param {String} sourceLanguage the source language
 * @returns {Promise} a promise with the translation
 */
function requestWordTranslation( word, targetLanguage, sourceLanguage ) {
	return new Promise( ( resolve, reject ) => {
		request.get( 'https://www.googleapis.com/language/translate/v2' )
			.query( {
				key: config( 'google_translate_api_key' ),
				target: targetLanguage,
				source: sourceLanguage || 'en',
				q: word
			} ).end( ( error, response ) => {
				if ( error ) {
					return reject( new Error( error ) );
				}

				const translatedWord = response.body.data.translations[ 0 ].translatedText;
				resolve( translatedWord );
			} );
	} );
}

export const translateWord = memoize( requestWordTranslation, ( ...args ) => args.join( '___' ) );
