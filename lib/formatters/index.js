// External dependencies
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import snakeCase from 'lodash/snakeCase';
import trim from 'lodash/trim';

/**
 * Returns the specified object with all keys transformed by the given function.
 *
 * @param {object} object - object to convert
 * @param {function} fn - function to apply to each key
 * @return {object} the new object
 */
function mapKeysDeep( object, fn ) {
	if ( ! isPlainObject( object ) ) {
		return object;
	}

	return Object.keys( object ).reduce( function( result, key ) {
		let value = object[ key ];

		if ( isPlainObject( value ) ) {
			value = mapKeysDeep( value, fn );
		} else if ( isArray( value ) ) {
			value = value.map( arrayValue => mapKeysDeep( arrayValue, fn ) );
		}

		result[ fn( key ) ] = value;

		return result;
	}, {} );
}
/**
 * Converts all keys of the specified object to camel case.
 *
 * @param {object} object - object to convert
 * @return {object} the new object
 */
export const camelizeKeys = object => mapKeysDeep( object, camelCase );

/**
 * Converts all keys of the specified object to camel case.
 *
 * @param {object} object - object to convert
 * @return {object} the new object
 */
export const snakeifyKeys = object => mapKeysDeep( object, snakeCase );

/**
 * Prevent widows by replacing spaces between the last `wordsToKeep` words in the text with non-breaking spaces
 * This code is originally from wp-calypso:
 * https://github.com/Automattic/wp-calypso/blob/master/client/lib/formatting/index.js#L56
 *
 * @param  {string} text        the text to work on
 * @param  {number} wordsToKeep the number of words to keep together
 * @return {string}             the widow-prevented string
 */
export const preventWidows = ( text, wordsToKeep = 2 ) => {
	let words, endWords;

	if ( typeof text !== 'string' ) {
		return text;
	}

	text = text && trim( text );
	if ( ! text ) {
		return text;
	}

	words = text.match( /\S+/g );
	if ( ! words || 1 === words.length ) {
		return text;
	}

	if ( words.length <= wordsToKeep ) {
		return words.join( '\xA0' );
	}

	endWords = words.splice( -wordsToKeep, wordsToKeep );

	return words.join( ' ' ) + ' ' + endWords.join( '\xA0' );
};

export const withPreventWidows = ( wrappedFunction, wordsToKeep = 2 ) => {
	return ( ...args ) => {
		const text = wrappedFunction( ...args );
		if ( typeof text === 'string' ) {
			return preventWidows( text, wordsToKeep );
		}

		return text;
	};
};
