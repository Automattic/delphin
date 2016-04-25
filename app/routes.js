// External dependencies
import { formatPattern } from 'react-router';
import omit from 'lodash/omit';

// Internal dependencies
import About from 'components/ui/about';
import { buildPaths } from 'lib/routes';
import Checkout from 'components/ui/checkout';
import NotFound from 'components/ui/not-found';
import Root from 'components/ui/root';
import SearchContainer from 'components/containers/search';
import Success from 'components/ui/success';

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

const paths = buildPaths( routes );

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
