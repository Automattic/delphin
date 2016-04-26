// External dependencies
import find from 'lodash/find';

// Internal dependencies
import config from 'config';

/**
 * Returns a map of slugs to paths based on the given route.
 *
 * @param {object} rootRoute A route object, which may contain child routes.
 * @param {string} path A string that is prepended to the path.
 * @param {object} newPaths The current map of slugs to paths.
 * @return {object} A map of slugs to paths.
 */
export const buildPaths = ( rootRoute, path = '', newPaths = {} ) => {
	path = rootRoute.path === '/' ? rootRoute.path : `${ path }/${ rootRoute.path }`;

	Object.assign( newPaths, { [ rootRoute.slug ]: path } );

	if ( rootRoute.childRoutes ) {
		rootRoute.childRoutes.forEach( route => {
			newPaths = Object.assign( newPaths, buildPaths( route, path, newPaths ) );
		} );
	}

	return newPaths;
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
