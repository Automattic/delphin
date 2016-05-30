// External dependencies
import find from 'lodash/find';
import omit from 'lodash/omit';

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
const addPath = ( route, prefix, paths ) => {
	let path, newPaths;

	if ( route.path ) {
		path = getPath( route, prefix );

		newPaths = Object.assign( {}, paths, { [ route.slug ]: path } );
	} else {
		path = prefix;

		newPaths = Object.assign( {}, paths );
	}

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
 * Returns a new array of routes, omitting the `slug` property from each route.
 *
 * @param {array} routes - An array of routes.
 * @return {array} An array of routes with `slug` omitted.
 */
const omitSlugFromRoutes = routes => {
	return routes.map( route => {
		let newRoute;
		if ( route.childRoutes ) {
			newRoute = Object.assign( {}, route, {
				childRoutes: omitSlugFromRoutes( route.childRoutes )
			} );
		} else {
			newRoute = route;
		}

		return omit( newRoute, 'slug' );
	} );
};

/**
 * Returns a new array of routes with the top level routes prefixed by a locale slug.
 *
 * @param {array} routes - An array of routes.
 * @return {array} An array of routes.
 */
export const getLocalizedRoutes = routes => {
	const routesWithoutSlug = omitSlugFromRoutes( routes );

	let localizedRoutes = [];
	config( 'languages' ).forEach( language => {
		localizedRoutes = localizedRoutes.concat( routesWithoutSlug.map( route => (
			Object.assign( {}, route, {
				path: route.path === '/' ? language.langSlug : `${ language.langSlug }/${ route.path }`
			} )
		) ) );
	} );

	return localizedRoutes;
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
