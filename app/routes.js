// External dependencies
import { formatPattern } from 'react-router';
import i18n from 'i18n-calypso';

// Internal dependencies
import DefaultLayoutWithHeader from 'components/ui/layout/default-with-header';
import Layout from 'components/ui/layout';
import LearnMoreContainer from 'components/containers/learn-more';
import LoginContainer from 'components/containers/connect-user/login';
import NoMarginLayout from 'components/ui/layout/no-margin';
import NotFound from 'components/ui/not-found';
import SearchContainer from 'components/containers/search';
import SignupContainer from 'components/containers/connect-user/signup';
import SunriseConfirmDomainContainer from 'components/containers/sunrise-confirm-domain';
import SunriseHomeContainer from 'components/containers/sunrise-home';
import SunriseFlowLayout from 'components/ui/layout/sunrise/flow';
import SunriseSuccessLayout from 'components/ui/layout/sunrise/success';
import VerifyUserContainer from 'components/containers/connect-user/verify';
import { buildPaths, getLocalizedRoutes } from 'lib/routes';
import { verifyUserWithQueryContainerFactory } from 'components/containers/verify-user-with-query-container-factory';
import { getComponent } from 'sections';

let publicRoutes = [
	{
		component: NoMarginLayout,
		indexRoute: {
			component: SunriseHomeContainer
		},
		path: '/',
		slug: 'home',
		static: true,
		childRoutes: [
			{
				path: 'my-domains',
				slug: 'myDomains',
				static: false,
				getComponent: getComponent( 'myDomains', 'myDomains' )
			},
			{
				path: 'set-up-domain/:domainName',
				slug: 'setUpDomain',
				static: false,
				getComponent: getComponent( 'setUp', 'setUpDomain' )
			},
			{
				path: 'set-up-domain/:domainName/existing-blog',
				slug: 'setUpExistingBlog',
				static: false,
				getComponent: getComponent( 'setUp', 'setUpExistingBlog' )
			},
			{
				path: 'set-up-domain/:domainName/existing-blog/connect',
				slug: 'connectExistingBlog',
				static: false,
				getComponent: getComponent( 'setUp', 'connectExistingBlog' )
			},
			{
				path: 'set-up-domain/:domainName/new-blog',
				slug: 'setUpNewBlog',
				static: false,
				getComponent: getComponent( 'setUp', 'setUpNewBlog' )
			},
			{
				path: 'set-up-domain/:domainName/hosts',
				slug: 'hosts',
				static: false,
				getComponent: getComponent( 'setUp', 'hosts' )
			},
			{
				path: 'set-up-domain/:domainName/hosts/:slug',
				slug: 'hostInfo',
				static: false,
				getComponent: getComponent( 'setUp', 'hostInfo' )
			},
		]
	},
	{
		component: DefaultLayoutWithHeader,
		childRoutes: [
			{
				path: 'sign-in-with-email',
				slug: 'signInWithEmail',
				static: true,
				component: verifyUserWithQueryContainerFactory( 'login' )
			},
			{
				path: 'sign-up-with-email',
				slug: 'signUpWithEmail',
				static: true,
				component: verifyUserWithQueryContainerFactory( 'signup' )
			}
		]
	},
	{
		component: SunriseFlowLayout,
		childRoutes: [
			{
				path: 'contact-information',
				slug: 'contactInformation',
				static: false,
				getComponent: getComponent( 'checkout', 'contactInformation' )
			},
			{
				path: 'confirm-domain',
				slug: 'confirmDomain',
				static: true,
				component: SunriseConfirmDomainContainer
			},
			{
				path: 'signup',
				slug: 'signupUser',
				static: true,
				component: SignupContainer
			},
			{
				path: 'log-in',
				slug: 'loginUser',
				static: true,
				component: LoginContainer
			},
			{
				path: 'verify',
				slug: 'verifyUser',
				static: false,
				component: VerifyUserContainer
			},
			{
				path: 'checkout',
				slug: 'checkout',
				static: false,
				getComponent: getComponent( 'checkout', 'checkout' )
			},
			{
				path: 'checkout-review',
				slug: 'checkoutReview',
				static: false,
				getComponent: getComponent( 'checkout', 'checkoutReview' )
			},
			{
				path: 'learn-more',
				slug: 'learnMore',
				static: true,
				component: LearnMoreContainer
			}
		]
	},
	{
		component: SunriseSuccessLayout,
		childRoutes: [
			{
				path: 'success',
				slug: 'success',
				static: false,
				getComponent: getComponent( 'checkout', 'success' )
			}
		]
	},
	{
		path: 'search',
		slug: 'search',
		static: true,
		component: SearchContainer
	}
];

export const defaultRoutes = publicRoutes;

const localizedRoutes = getLocalizedRoutes( defaultRoutes );

export const routes = {
	component: Layout,
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
			static: true,
			slug: 'notFound'
		}
	]
};

// Ignore localized routes here
const paths = buildPaths( {
	childRoutes: defaultRoutes
} );

/**
 * Gets the path with the given slug, replacing parameter placeholders with the given values.
 *
 * @param {string} slug The unique identifier of the path to search for in the routes.
 * @param {object} values The values to use when replacing the route's placeholders.
 * @param {object} overrides The routes to search through.
 * @return {string|null} A string representing a path in the application, with parameters
 *    replaced by the given values.
 */
export const getPath = ( slug, values = {}, overrides = {} ) => {
	let pathMap = paths;

	if ( overrides.routes ) {
		pathMap = buildPaths( overrides.routes );
	}

	const path = pathMap[ slug ];

	if ( ! path ) {
		return null;
	}

	const formattedPath = formatPattern( path, values );

	let locale = i18n.getLocaleSlug();

	if ( overrides.locale ) {
		locale = overrides.locale;
	}

	if ( ! locale || locale === 'en' ) {
		return formattedPath;
	}

	return `/${ locale }${ formattedPath }`;
};
