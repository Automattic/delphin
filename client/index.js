// External dependencies
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

// Internal dependencies
import { adTrackingMiddleware } from './ad-tracking-middleware';
import { analyticsMiddleware } from './analytics-middleware';
import App from 'app';
import config, { isEnabled } from 'config';
import { default as wpcomMiddleware } from './wpcom-middleware';
import { fetchUser } from 'actions/user';
import { getTokenFromBearerCookie } from './bearer-cookie';
import i18n from 'i18n-calypso';
import { logErrorNoticesMiddleware } from './log-error-notices-middleware';
import reducers from 'reducers';
import { relatedWordsMiddleware } from './related-words-middleware';
import { setLocaleCookie } from './locale-cookie';
import Stylizer, { insertCss } from 'lib/stylizer';
import switchLocale from './switch-locale';
import { switchLocaleMiddleware } from './switch-locale-middleware';
import { userMiddleware } from './user-middleware';
import { provideStore, sections } from 'sections';
import { wpcomLoginMiddleware } from './wpcom-login-middleware';
import { wpcomNoticesMiddleware } from './wpcom-notices-middleware';

// Set the public path based on the current environment
let cdnPrefix = '';
if ( window.location.host.indexOf( 'getdotblogstaging' ) > -1 ) {
	cdnPrefix = config( 'staging_cdn_prefix' );
} else if ( window.location.host.indexOf( 'get.blog' ) > -1 ) {
	cdnPrefix = config( 'production_cdn_prefix' );
}

__webpack_public_path__ = cdnPrefix + __webpack_public_path__; // eslint-disable-line

const middlewares = [
	routerMiddleware( browserHistory ),
	thunk,
	adTrackingMiddleware,
	analyticsMiddleware,
	logErrorNoticesMiddleware,
	wpcomMiddleware,
	wpcomLoginMiddleware,
	wpcomNoticesMiddleware,
	relatedWordsMiddleware,
	switchLocaleMiddleware,
	userMiddleware
];

const isDevelopment = 'production' !== config( 'env' );

if ( isDevelopment && localStorage.ENABLE_REDUX_LOGGER ) {
	middlewares.push( createLogger( {
		collapsed: true,
		level: {
			action: 'log',
			error: 'log',
			prevState: false,
			nextState: 'log'
		},
		timestamp: false
	} ) );
}

const store = createStore(
	combineReducers( {
		...reducers,
		routing: routerReducer
	} ),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	applyMiddleware( ...middlewares )
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore( browserHistory, store );

// Provide the store to `sections` to enable a loading state when fetching
// section chunks
provideStore( store );

function init() {
	if ( window.Raven && isEnabled( 'sentry' ) ) {
		window.Raven.config( 'https://02c1c1625528468ea40a86143860cdb7@sentry.io/96319' ).install();
		// This is an experiment to send uncaught error in Promises to Sentry
		// We might want to remove it if we receive too many errors
		window.addEventListener( 'unhandledrejection', ( err ) => {
			window.Raven.captureException( err.reason );
		} );
	}

	window.switchLocale = switchLocale;

	if ( window.localeData ) {
		i18n.setLocale( window.localeData );
	}

	injectTapEventPlugin();

	// pre-load checkout chunk
	sections.checkout();
}

function render() {
	let containerElement = document.getElementById( 'content' );
	ReactDOM.render(
		<Provider store={ store }>
			<Stylizer onInsertCss={ insertCss }>
				<App history={ history } />
			</Stylizer>
		</Provider>,
		containerElement
	);
}

function boot() {
	init();

	render();

	setLocaleCookie( i18n.getLocaleSlug() );
}

const bearerToken = getTokenFromBearerCookie();

if ( bearerToken ) {
	store.dispatch( fetchUser() ).then( boot );
} else {
	boot();
}
