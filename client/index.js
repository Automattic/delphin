/**
 * External dependencies
 */
import { browserHistory } from 'react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import App from 'app';
import reducers from 'reducers';
import i18n from 'lib/i18n';

const store = createStore(
	combineReducers( {
		...reducers,
		routing: routerReducer
	} ),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	applyMiddleware( routerMiddleware( browserHistory ), thunk )
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore( browserHistory, store );

function init() {
	var i18nLocaleStringsObject = null;

	// Initialize i18n
	if ( window.i18nLocaleStrings ) {
		i18nLocaleStringsObject = JSON.parse( window.i18nLocaleStrings );
	}
	i18n.initialize( i18nLocaleStringsObject );

	injectTapEventPlugin();
}

function render() {
	ReactDOM.render(
		<Provider store={ store }>
			<App history={ history } />
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
