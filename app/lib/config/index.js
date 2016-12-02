// External dependencies
import fromPairs from 'lodash/fromPairs';
import map from 'lodash/map';
import startsWith from 'lodash/startsWith';

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
 * Eg. `?features.m3&features.ad_tracking=false`
 *
 * @param {Object} features - A features object (plain JS object with properties and values)
 * @param {String} queryString - A query string / search string (with or without the leading ? character)
 * @returns {Object} the modified config
 */
export function applyQueryStringToFeatures( features, queryString ) {
	const queryParams = getQueryParams( queryString ),
		prefix = 'features.';

	const newFeatures = Object.keys( queryParams ).reduce( ( currentFeatures, value ) => {
		if ( ! startsWith( value, prefix ) || value === prefix ) {
			return currentFeatures;
		}

		currentFeatures[ value.replace( prefix, '' ) ] = queryParams[ value ] !== 'false'; // ensure 'false' becomes a boolean

		return currentFeatures;
	}, {} );

	return Object.assign( {}, features, newFeatures );
}
