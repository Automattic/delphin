/**
 * External dependencies
 */
import { browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import App from './app';
import reducers from './reducers';

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

injectTapEventPlugin();

ReactDOM.render(
	<Provider store={ store }>
		<App history={ history } />
	</Provider>,
	document.getElementById( 'content' )
);
