/**
 * Styles
 */
import 'styles/app.scss';

/**
 * External dependencies
 */
import App from './app';

/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import reducers from './state/reducers';

const store = createStore(
	combineReducers({
		...reducers,
		routing: routerReducer
	}),
	window.devToolsExtension ? window.devToolsExtension() : f => f,
	applyMiddleware( routerMiddleware( browserHistory ), thunk )
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore( browserHistory, store );

ReactDOM.render(
	<Provider store={ store }>
		<App history={ history } />
	</Provider>,
	document.getElementById( 'content' )
);
