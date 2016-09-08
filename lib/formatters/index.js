// External dependencies
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import snakeCase from 'lodash/snakeCase';

/**
 * Returns the specified object with all keys transformed by the given function.
 *
 * @param {object} object - object to convert
 * @param {function} fn - function to apply to each key
 * @return {object} the new object
 */
function mapKeysDeep( object, fn ) {
	if ( isArray( object ) ) {
		return object.map( arrayValue => mapKeysDeep( arrayValue, fn ) );
	}

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

const wordsRegex = new RegExp( '\\S+', 'g' );
/**
 * Prevent widows by replacing spaces between the last `wordsToKeep` words in the text with non-breaking spaces
 * This code is originally from wp-calypso:
 * https://github.com/Automattic/wp-calypso/blob/master/client/lib/formatting/index.js#L56
 * We however, use a different implementation to preserve original whitespace
 *
 * @param  {string} text        the text to work on
 * @param  {number} wordsToKeep the number of words to keep together
 * @return {string}             the widow-prevented string
 */
export const preventWidows = ( text, wordsToKeep = 2 ) => {
	if ( typeof text !== 'string' ) {
		return text;
	}

	let match;
	let matches = [];

	while ( ( match = wordsRegex.exec( text ) ) !== null ) {
		matches.push( match );
	}

	if ( matches.length < 1 ) {
		return text;
	}

	let startIndex,
		endIndex = matches[ matches.length - 1 ] .index + matches[ matches.length - 1 ][ 0 ].length - 1;

	if ( matches.length < wordsToKeep ) {
		startIndex = matches[ 0 ].index;
	} else {
		startIndex = matches[ matches.length - wordsToKeep ].index;
	}

	return text.replace( /\s+/g, ( replaceMatch, offset ) => {
		if ( offset > startIndex && offset < endIndex ) {
			return '\xA0';
		} else if ( replaceMatch === '\xA0' ) {
			return ' ';
		}

		return replaceMatch;
	} );
};
