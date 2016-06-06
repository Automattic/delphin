// External dependencies
import request from 'superagent';
import config from 'config';
import memoize from 'lodash/memoize';

/***
 * Requests a word translation from an API
 * @param {String} word the word needs to be translated
 * @param {String} targetLanguage the target language
 * @param {String} sourceLanguage the source language
 * @returns {Promise} a promise with a translation object that has props: word and sourceLanguage
 */
function requestWordTranslation( word, targetLanguage, sourceLanguage ) {
	return new Promise( ( resolve, reject ) => {
		const requestParams = {
			key: config( 'google_translate_api_key' ),
			target: targetLanguage,
			q: word
		};

		if ( targetLanguage !== 'en' ) {
			requestParams.source = sourceLanguage;
		}

		request.get( 'https://www.googleapis.com/language/translate/v2' )
			.query( requestParams ).end( ( error, response ) => {
				if ( error ) {
					return reject( new Error( error ) );
				}

				const translatedWord = response.body.data.translations[ 0 ].translatedText;
				const detectedSourceLanguage = response.body.data.translations[ 0 ].detectedSourceLanguage || sourceLanguage;
				resolve( { word: translatedWord, sourceLanguage: detectedSourceLanguage } );
			} );
	} );
}

const englishWordRegex = /[\w-\s0-9]+/i;

/***
 * Returns whether that's an "English" word (including -, space, and numbers
 * @param {String} word a word
 * @returns {Boolean} true if the word is with english characters
 */
export function isEnglishWord( word ) {
	return word.match( englishWordRegex );
}

export const translateWord = memoize( requestWordTranslation, ( ...args ) => args.join( '___' ) );
