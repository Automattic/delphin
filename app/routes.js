// External dependencies
import { formatPattern } from 'react-router';
import omit from 'lodash/omit';

// Internal dependencies
import About from 'components/ui/about';
import Checkout from 'components/ui/checkout';
import config from 'config';
import NotFound from 'components/ui/not-found';
import Root from 'components/ui/root';
import SearchContainer from 'components/containers/search';
import Success from 'components/ui/success';

// This will contain a map of paths once this module is evaluated
let paths = {};

const childRoutes = [
	{
		path: 'about',
		slug: 'about',
		component: About
	},
	{
		path: 'checkout',
		slug: 'checkout',
		component: Checkout
	},
	{
		path: 'success',
		slug: 'success',
		component: Success
	}
];

export const routes = {
	path: '/',
	slug: 'search',
	component: Root,
	indexRoute: {
		component: SearchContainer
	},
	childRoutes: [
		...childRoutes,
		{
			path: ':locale',
			indexRoute: {
				component: SearchContainer
			},
			childRoutes: childRoutes.map( route => omit( route, 'slug' ) )
		},
		{
			path: '*',
			component: NotFound,
			slug: 'notFound'
		}
	]
};

/**
 * Returns a map of slugs to paths based on the given route.
 *
 * @param {object} rootRoute A route object, which may contain child routes.
 * @param {string} path A string that is prepended to the path.
 * @param {object} newPaths The current map of slugs to paths.
 * @return {object} A map of slugs to paths.
 */
const buildPaths = ( rootRoute, path = '', newPaths = {} ) => {
	path = rootRoute.path === '/' ? rootRoute.path : `${ path }/${ rootRoute.path }`;

	Object.assign( newPaths, { [ rootRoute.slug ]: path } );

	if ( rootRoute.childRoutes ) {
		rootRoute.childRoutes.forEach( route => {
			newPaths = Object.assign( newPaths, buildPaths( route, path, newPaths ) );
		} );
	}

	return newPaths;
};

paths = buildPaths( routes );

/**
 * Gets the path with the given slug, replacing parameter placeholders with the given values.
 *
 * @param {string} slug The unique identifier of the path to search for in the routes.
 * @param {object} values The values to use when replacing the route's placeholders.
 * @param {object} overrideRoutes The routes to search through.
 * @return {string|null} A string representing a path in the application, with parameters
 *	replaced by the given values.
 */
export const getPath = ( slug, values = {}, overrideRoutes ) => {
	let pathMap = paths;

	if ( overrideRoutes ) {
		pathMap = buildPaths( overrideRoutes );
	}

	const path = pathMap[ slug ];

	if ( ! path ) {
		return null;
	}

	return formatPattern( path, values );
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

export const serverRedirectRoutes = [
	{
		from: getPath( 'checkout' ),
		to: getPath( 'search' )
	},
	{
		from: getPath( 'success' ),
		to: getPath( 'search' )
	}
];
