// External dependencies
import { formatPattern } from 'react-router';
import omit from 'lodash/omit';

// Internal dependencies
import About from 'components/ui/about';
import { buildPaths } from 'lib/routes';
import CheckoutContainer from 'components/containers/checkout';
import config from 'config';
import i18n from 'lib/i18n';
import LoginContainer from 'components/containers/connect-user/login';
import NotFound from 'components/ui/not-found';
import Root from 'components/ui/root';
import SearchContainer from 'components/containers/search';
import SignupContainer from 'components/containers/connect-user/signup';
import SuccessContainer from 'components/containers/success';
import VerifyUserContainer from 'components/containers/connect-user/verify';

const childRoutes = [
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

const childRoutesWithoutSlug = childRoutes.map( route => omit( route, 'slug' ) );

const localeRoutes = config( 'languages' ).map( language => {
	return {
		path: `/${ language.langSlug }`,
		indexRoute: { component: SearchContainer },
		childRoutes: childRoutesWithoutSlug
	};
} );

export const routes = {
	path: '/',
	slug: 'search',
	component: Root,
	indexRoute: {
		component: SearchContainer
	},
	childRoutes: [
		// In order to prevent `/:locale` from matching English routes like `/about`,
		// we include the routes without a locale slug first.
		...childRoutes,
		// We use a list of routes with each locale slug instead of a wildcard path
		// fragment like `/:locale` so that routes like `/foobar/about` still 404.
		...localeRoutes,
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

	if ( locale === config( 'i18n_default_locale_slug' ) || ! locale ) {
		return formattedPath;
	}

	return `/${ i18n.getLocaleSlug() }${ formattedPath }`;
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
