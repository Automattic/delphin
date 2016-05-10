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
import App from 'app';
import { fetchUser } from 'actions';
import { getTokenFromBearerCookie } from 'lib/bearer-cookie';
import i18n from 'lib/i18n';
import reducers from 'reducers';
import Stylizer, { insertCss } from 'lib/stylizer';

const store = createStore(
	combineReducers( {
		...reducers,
		routing: routerReducer
	} ),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	applyMiddleware(
		routerMiddleware( browserHistory ),
		thunk,
		analyticsMiddleware
	)
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore( browserHistory, store );

function init() {
	i18n.initialize( window.localeData );

	const bearerToken = getTokenFromBearerCookie();

	if ( bearerToken ) {
		store.dispatch( fetchUser( bearerToken ) );
	}

	injectTapEventPlugin();
}

function render() {
	ReactDOM.render(
		<Provider store={ store }>
			<Stylizer onInsertCss={ insertCss }>
				<App history={ history } />
			</Stylizer>
		</Provider>,
		document.getElementById( 'content' )
	);
}

function boot() {
	init();

	render();
	i18n.observer.on( 'change', render );

	window.i18n = i18n;
}

boot();
