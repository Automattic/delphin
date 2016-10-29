import cloneDeep from 'lodash/cloneDeep';
import each from 'lodash/each';
import fromPairs from 'lodash/fromPairs';
import get from 'lodash/get';
import map from 'lodash/map';
import set from 'lodash/set';

/**
 * Parses a simple query string into an object
 * ex: `?hello=world&foo` => { hello: "world", foo: true }
 *
 * @param {String} queryString A query string such as the one provided by `window.location.search`
 * @returns {Object} the parsed query string in an object format
 */
export function getQueryParams( queryString = '' ) {
	const query = queryString.match( /^\?/ ) ? queryString.substring( 1 ) : queryString;

	if ( ! query ) {
		return {};
	}

	return fromPairs( map( query.split( '&' ), paramPair => {
		const [ key, value ] = paramPair.split( '=' );
		return [ key, value ? decodeURIComponent( value ) : true ];
	} ) );
}

/**
 * Applies some modifications to a config object with a given
 * query string such as the one provided by `window.location.search`.
 * Eg. `?features.m3&default_tld=live`
 *
 * @param {Object} config - A config object (plain JS object with properties and values)
 * @param {String} queryString - A query string / search string (with or without the leading ? character)
 * @returns {Object} the modified config
 */
export function applyQueryStringToConfig( config, queryString ) {
	const configCopy = cloneDeep( config ),
		queryParams = getQueryParams( queryString );

	each( queryParams, ( value, parameter ) => {
		if ( get( config, parameter ) !== undefined ) {
			// convert values to numbers or boolean
			// Assume boolean if no value is given
			value = ! isNaN( parseFloat( value ) ) ? parseFloat( value ) : value;
			value = ( value === 'false' || value === 'true' ) ? value === 'true' : value;
			set( configCopy, parameter, value );
		}
	} );

	return configCopy;
}
