// External dependencies
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

// Internal dependencies
import { analyticsMiddleware } from './analytics-middleware';
import { default as wpcomMiddleware } from './wpcom-middleware';
import App from 'app';
import { fetchUser } from 'actions/user';
import { getTokenFromBearerCookie } from './bearer-cookie';
import reducers from 'reducers';
import i18n from 'i18n-calypso';
import Stylizer, { insertCss } from 'lib/stylizer';
import switchLocale from './switch-locale';
import { userMiddleware } from './user-middleware';
import { relatedWordsMiddleware } from './related-words-middleware';

const store = createStore(
	combineReducers( {
		...reducers,
		routing: routerReducer
	} ),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	applyMiddleware(
		routerMiddleware( browserHistory ),
		thunk,
		analyticsMiddleware,
		userMiddleware,
		wpcomMiddleware,
		relatedWordsMiddleware
	)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore( browserHistory, store );

function init() {
	if ( window.localeData ) {
		i18n.setLocale( window.localeData );
	}

	const bearerToken = getTokenFromBearerCookie();

	// if user has prev. bearer token, we'll dispatch the fetch user action
	// the internals will handle the bearer token.
	if ( bearerToken ) {
		store.dispatch( fetchUser() );
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
}

boot();
