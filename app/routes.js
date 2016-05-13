// External dependencies
import { formatPattern } from 'react-router';
import filter from 'lodash/filter';
import omit from 'lodash/omit';

// Internal dependencies
import About from 'components/ui/about';
import { buildPaths } from 'lib/routes';
import CheckoutContainer from 'components/containers/checkout';
import config from 'config';
import HomeContainer from 'components/containers/home';
import i18n from 'i18n-calypso';
import LoginContainer from 'components/containers/connect-user/login';
import NotFound from 'components/ui/not-found';
import Layout from 'components/ui/layout';
import SearchContainer from 'components/containers/search';
import SignupContainer from 'components/containers/connect-user/signup';
import SuccessContainer from 'components/containers/success';
import VerifyUserContainer from 'components/containers/connect-user/verify';

const defaultRoutes = [
	{
		path: 'about',
		slug: 'about',
		component: About
	},
	{
		path: 'checkout',
		slug: 'checkout',
		component: CheckoutContainer
	},
	{
		path: 'login',
		slug: 'loginUser',
		component: LoginContainer
	},
	{
		path: 'search',
		slug: 'search',
		component: SearchContainer
	},
	{
		path: 'signup',
		slug: 'signupUser',
		component: SignupContainer
	},
	{
		path: 'verify',
		slug: 'verifyUser',
		component: VerifyUserContainer
	},
	{
		path: 'success',
		slug: 'success',
		component: SuccessContainer
	}
];

const childRoutesWithoutSlug = defaultRoutes.map( route => omit( route, 'slug' ) );

const localizedRoutes = filter( config( 'languages' ), language => {
	return language.langSlug !== 'en';
} ).map( language => {
	return {
		path: `/${ language.langSlug }`,
		indexRoute: { component: HomeContainer },
		childRoutes: childRoutesWithoutSlug
	};
} );

export const routes = {
	path: '/',
	slug: 'home',
	component: Layout,
	indexRoute: {
		component: HomeContainer
	},
	childRoutes: [
		// In order to prevent `/:locale` from matching English routes like `/about`,
		// we include the routes without a locale slug first.
		...defaultRoutes,
		// We use a list of routes with each locale slug instead of a wildcard path
		// fragment like `/:locale` so that routes like `/foobar/about` still 404.
		...localizedRoutes,
		{
			path: '*',
			component: NotFound,
			slug: 'notFound'
		}
	]
};

const paths = buildPaths( routes );

export const staticPages = [ '/', '/about', '/404' ];

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

	const formattedPath = formatPattern( path, values ),
		locale = i18n.getLocaleSlug();

	if ( ! locale || locale === 'en' ) {
		return formattedPath;
	}

	return `/${ i18n.getLocaleSlug() }${ formattedPath }`;
};

export const serverRedirectRoutes = [
	{
		from: getPath( 'checkout' ),
		to: getPath( 'home' )
	},
	{
		from: getPath( 'success' ),
		to: getPath( 'home' )
	}
];
