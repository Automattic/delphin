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
import { analyticsMiddleware } from './analytics-middleware';
import config from 'config';
import { default as wpcomMiddleware } from './wpcom-middleware';
import App from 'app';
import { logErrorNoticesMiddleware } from './log-error-notices-middleware';
import reducers from 'reducers';
import i18n from 'i18n-calypso';
import { setLocaleCookie } from './locale-cookie';
import Stylizer, { insertCss } from 'lib/stylizer';
import switchLocale from './switch-locale';
import { relatedWordsMiddleware } from './related-words-middleware';

const middlewares = [
	routerMiddleware( browserHistory ),
	thunk,
	analyticsMiddleware,
	logErrorNoticesMiddleware,
	wpcomMiddleware,
	relatedWordsMiddleware
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

function init() {
	if ( window.localeData ) {
		i18n.setLocale( window.localeData );
	}

	injectTapEventPlugin();
}

function render() {
	var containerElement = document.getElementById( 'content' );
	ReactDOM.unmountComponentAtNode( containerElement );
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
	i18n.stateObserver.on( 'change', render );

	window.switchLocale = switchLocale;

	setLocaleCookie( i18n.getLocaleSlug() );
}

boot();
