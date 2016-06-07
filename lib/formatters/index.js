// External dependencies
import camelCase from 'lodash/camelCase';
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
	return Object.keys( object ).reduce( function( result, key ) {
		let value = object[ key ];

		if ( isPlainObject( value ) ) {
			value = mapKeysDeep( value, fn );
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
export const camelize = object => mapKeysDeep( object, camelCase );

/**
 * Converts all keys of the specified object to camel case.
 *
 * @param {object} object - object to convert
 * @return {object} the new object
 */
export const snakeify = object => mapKeysDeep( object, snakeCase );
