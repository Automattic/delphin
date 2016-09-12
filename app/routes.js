// External dependencies
import { formatPattern } from 'react-router';
import i18n from 'i18n-calypso';

// Internal dependencies
import About from 'components/ui/about';
import CheckoutContainer from 'components/containers/checkout';
import ContactInformationContainer from 'components/containers/contact-information';
import CheckoutReviewContainer from 'components/containers/checkout-review';
import DefaultLayoutWithHeader from 'components/ui/layout/default-with-header';
import Layout from 'components/ui/layout';
import LearnMore from 'components/containers/learn-more';
import LoginContainer from 'components/containers/connect-user/login';
import NoMarginLayout from 'components/ui/layout/no-margin';
import NotFound from 'components/ui/not-found';
import SearchContainer from 'components/containers/search';
import SignupContainer from 'components/containers/connect-user/signup';
import SuccessContainer from 'components/containers/success';
import SunriseConfirmDomainContainer from 'components/containers/sunrise-confirm-domain';
import SunriseHomeContainer from 'components/containers/sunrise-home';
import SunriseFlowLayout from 'components/ui/layout/sunrise/flow';
import SunriseSuccessLayout from 'components/ui/layout/sunrise/success';
import VerifyUserContainer from 'components/containers/connect-user/verify';
import { buildPaths, getLocalizedRoutes } from 'lib/routes';
import { verifyUserWithQueryContainerFactory } from 'components/containers/verify-user-with-query-container-factory';

let publicRoutes = [
	{
		component: NoMarginLayout,
		indexRoute: {
			component: SunriseHomeContainer
		},
		path: '/',
		slug: 'home',
		static: true
	},
	{
		component: DefaultLayoutWithHeader,
		childRoutes: [
			{
				path: 'about',
				slug: 'about',
				static: true,
				component: About,
				childRoutes: [
					{
						path: 'testnest',
						slug: 'testnest',
						component: About,
						static: true
					}
				]
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
			}
		]
	},
	{
		component: SunriseFlowLayout,
		childRoutes: [
			{
				path: 'contact-information',
				slug: 'contactInformation',
				component: ContactInformationContainer,
				static: false
			},
			{
				path: 'confirm-domain',
				slug: 'confirmDomain',
				static: false,
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
				component: CheckoutContainer
			},
			{
				path: 'checkout-review',
				slug: 'checkoutReview',
				static: false,
				component: CheckoutReviewContainer
			},
			{
				path: 'learn-more',
				slug: 'learnMore',
				static: true,
				component: LearnMore
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
				component: SuccessContainer
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

if ( ! process.env.NODE_ENV || process.env.NODE_ENV === 'development' ) {
	const MyDomainsContainer = require( 'components/containers/my-domains' ).default;
	const HostsContainer = require( 'components/containers/hosts' ).default;
	const HostInfoContainer = require( 'components/containers/host-info' ).default;
	const SetUpDomain = require( 'components/ui/set-up-domain' ).default;

	publicRoutes = publicRoutes.map( route => {
		if ( route.slug === 'home' ) {
			const existingChildRoutes = route.childRoutes || [];

			return Object.assign( {}, route, { childRoutes: existingChildRoutes.concat( [
				{
					path: 'my-domains',
					slug: 'myDomains',
					static: false,
					component: MyDomainsContainer
				},
				{
					path: 'set-up-domain/:domain',
					slug: 'setUpDomain',
					static: false,
					component: SetUpDomain
				},
				{
					path: 'hosts',
					slug: 'hosts',
					static: false,
					component: HostsContainer
				},
				{
					path: 'hosts/:slug',
					slug: 'hostInfo',
					component: HostInfoContainer,
					static: false
				}
			] ) } );
		}

		return route;
	} );
}

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
