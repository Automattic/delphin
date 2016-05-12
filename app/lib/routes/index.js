// External dependencies
import find from 'lodash/find';

// Internal dependencies
import config from 'config';

/**
 * Retrieves the path of the specified route.
 *
 * @param {object} route - route object
 * @param {string} prefix - fragment that is prepended to the path
 * @returns {string} - the path of the route
 */
const getPath = ( route, prefix = '' ) => {
	if ( route.path === '/' ) {
		return route.path;
	}

	return `${ prefix }/${ route.path }`;
};

/**
 * Return a new map of slugs to paths with the path of the given route added.
 *
 * @param {object} route - route object, which may contain child routes
 * @param {string} prefix - fragment that is prepended to the path
 * @param {object} paths - current map of slugs to paths
 * @return {object} - a new map of slugs to paths
 */
const addPath = ( route, prefix = '', paths ) => {
	const path = getPath( route, prefix );

	let newPaths = Object.assign( {}, paths, { [ route.slug ]: path } );

	if ( route.childRoutes ) {
		route.childRoutes.forEach( childRoute => {
			newPaths = addPath( childRoute, path, newPaths );
		} );
	}

	return newPaths;
};

/**
 * Returns a map of slugs to paths based on the given route.
 *
 * @param {object} route - route object, which may contain child routes
 * @return {object} - a map of slugs to paths
 */
export const buildPaths = ( route ) => {
	return addPath( route, '', {} );
};

/**
 * Returns the locale slug from the beginning of a URL, e.g. `/fr/foobar`, if present.
 *
 * @param {string} url A URL.
 * @return {string|undefined} The locale slug from the URL, if present.
 */
export const getLocaleSlug = url => {
	return find( config( 'languages' ).map( language => language.langSlug ), localeSlug => (
		url.startsWith( `/${ localeSlug }/` ) || url === `/${ localeSlug }`
	) );
};

/**
 * Strips the locale slug from the beginning of a URL, e.g. `/fr/foobar`, if present.
 *
 * @param {string} url A URL.
 * @return {string} The URL without a leading locale slug.
 */
export const stripLocaleSlug = url => {
	config( 'languages' )
		.map( language => language.langSlug )
		.forEach( localeSlug => {
			if ( url.startsWith( `/${ localeSlug }/` ) || url === `/${ localeSlug }` ) {
				url = `/${ url.substring( localeSlug.length + 2 ) }`;
				return;
			}
		} );

	return url;
};
