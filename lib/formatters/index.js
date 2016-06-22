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
