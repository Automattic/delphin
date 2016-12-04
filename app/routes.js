// External dependencies
import { formatPattern } from 'react-router';
import i18n from 'i18n-calypso';

// Internal dependencies
import { DefaultDarkLayout, DefaultLightLayout } from 'components/ui/layout/default';
import Layout from 'components/ui/layout';
import LearnMoreContainer from 'components/containers/learn-more';
import LoginContainer from 'components/containers/connect-user/login';
import NotFound from 'components/ui/not-found';
import SearchContainer from 'components/containers/search';
import SignupContainer from 'components/containers/connect-user/signup';
import SunriseHomeContainer from 'components/containers/sunrise-home';
import VerifyUserContainer from 'components/containers/connect-user/verify';
import { buildPaths, getLocalizedRoutes } from 'lib/routes';
import { verifyUserWithQueryContainerFactory } from 'components/containers/verify-user-with-query-container-factory';
import { getComponent } from 'sections';

let publicRoutes = [
	{
		component: DefaultLightLayout,
		indexRoute: {
			component: SunriseHomeContainer
		},
		path: '/',
		slug: 'home',
		static: true,
		childRoutes: [
			{
				path: 'confirm-trademark/:domainName',
				slug: 'confirmTrademark',
				static: false,
				getComponent: getComponent( 'checkout', 'confirmTrademark' )
			},
			{
				path: 'contact-information',
				slug: 'contactInformation',
				static: false,
				getComponent: getComponent( 'checkout', 'contactInformation' )
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
				path: 'success',
				slug: 'success',
				static: false,
				getComponent: getComponent( 'checkout', 'success' )
			},
			{
				path: 'set-up-domain/:domainName',
				slug: 'selectBlogType',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'selectBlogType' )
			},
			{
				path: 'set-up-domain/:domainName/new-blog',
				slug: 'selectNewBlogNeeds',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'selectNewBlogNeeds' )
			},
			{
				path: 'set-up-domain/:domainName/new-blog/:needs',
				slug: 'selectNewBlogHost',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'selectNewBlogHost' )
			},
			{
				path: 'set-up-domain/:domainName/new-blog/connect/other',
				slug: 'connectNewBlogToOther',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'connectNewBlogToOther' )
			},
			{
				path: 'set-up-domain/:domainName/new-blog/connect/:service',
				slug: 'connectingNewBlog',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'connectingNewBlog' )
			},
			{
				path: 'set-up-domain/:domainName/new-blog/connect/:service/success',
				slug: 'confirmConnectNewBlog',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'confirmConnectBlog' )
			},
			{
				path: 'set-up-domain/:domainName/existing-blog',
				slug: 'findExistingBlog',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'findExistingBlog' )
			},
			{
				path: 'set-up-domain/:domainName/existing-blog/connect',
				slug: 'connectExistingBlog',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'connectExistingBlog' )
			},
			{
				path: 'set-up-domain/:domainName/existing-blog/connect/:hostName/:service',
				slug: 'connectingExistingBlog',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'connectingExistingBlog' )
			},
			{
				path: 'set-up-domain/:domainName/existing-blog/connect/:hostName/:service/success',
				slug: 'confirmConnectExistingBlog',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'confirmConnectBlog' )
			},
			{
				path: 'set-up-domain/:domainName/existing-blog/contact-us/:hostName',
				slug: 'contactUsExistingBlog',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'contactUsExistingBlog' )
			},
			{
				path: 'set-up-domain/:domainName/contact-assistant(/:hostName)',
				slug: 'contactConcierge',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'contactConcierge' )
			},
			{
				path: 'set-up-domain/:domainName/hosts',
				slug: 'hosts',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'hosts' )
			},
			{
				path: 'set-up-domain/:domainName/hosts/:slug',
				slug: 'hostInfo',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'hostInfo' )
			}
		]
	},
	{
		component: DefaultDarkLayout,
		childRoutes: [
			{
				path: 'learn-more',
				slug: 'learnMore',
				static: true,
				component: LearnMoreContainer
			},
			{
				path: 'my-domains',
				slug: 'myDomains',
				static: false,
				getComponent: getComponent( 'myDomains', 'myDomains' )
			},
			{
				path: 'search',
				slug: 'search',
				static: true,
				component: SearchContainer
			},
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
			},
			{
				path: 'set-up-domain/:domainName/update-nameservers',
				slug: 'updateNameservers',
				static: false,
				getComponent: getComponent( 'setUpDomain', 'updateNameservers' )
			}
		]
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
			component: DefaultDarkLayout,
			childRoutes: [
				{
					path: '*',
					component: NotFound,
					static: true,
					slug: 'notFound'
				}
			]
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
