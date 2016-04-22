// External dependencies
import { formatPattern } from 'react-router';

// Internal dependencies
import About from 'components/ui/about';
import Checkout from 'components/ui/checkout';
import NotFound from 'components/ui/not-found';
import Root from 'components/ui/root';
import SearchContainer from 'components/containers/search';
import Success from 'components/ui/success';

export const routes = {
	path: '/',
	slug: 'search',
	component: Root,
	indexRoute: {
		component: SearchContainer
	},
	childRoutes: [
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
		},
		{
			path: '*',
			component: NotFound,
			slug: 'notFound'
		}
	]
};

/**
 * Builds a path for the given slug by recursively searching the given routes.
 *
 * @param {string} slug The unique identifier of the path to search for in the routes.
 * @param {object} rootRoute A route object, which may contain child routes.
 * @param {string} path A string that is prepended to the path, if it is found.
 * @return {string|null} A string representing a path in the application.
 */
const buildPath = ( slug, rootRoute, path = '' ) => {
	if ( rootRoute.slug === slug ) {
		return rootRoute.path !== '/' ? `${ path }/${ rootRoute.path }` : rootRoute.path;
	}

	let match = null;
	if ( rootRoute.childRoutes ) {
		rootRoute.childRoutes.forEach( route => {
			const potentialPath = buildPath( slug, route, path + rootRoute.path );

			if ( potentialPath ) {
				match = potentialPath;
				return;
			}
		} );
	}

	return match;
};

/**
 * Gets the path with the given slug, replacing parameter placeholders with the given values.
 *
 * @param {string} slug The unique identifier of the path to search for in the routes.
 * @param {object} values The values to use when replacing the route's placeholders.
 * @param {object} rootRoute The route to search through.
 * @return {string|null} A string representing a path in the application, with parameters
 *	replaced by the given values.
 */
export const getPath = ( slug, values = {}, rootRoute = routes ) => {
	const path = buildPath( slug, rootRoute );

	if ( ! path ) {
		return null;
	}

	return formatPattern( path, values );
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
