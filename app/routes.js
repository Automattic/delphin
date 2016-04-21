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

const buildPath = ( slug, rootRoute, path = '' ) => {
	if ( rootRoute.slug === slug ) {
		return rootRoute.path !== '/' ? `${ path }/${ rootRoute.path }` : rootRoute.path;
	}

	let match;
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

export const getPath = ( slug, values = {}, allRoutes = routes ) => {
	const path = buildPath( slug, allRoutes );

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
