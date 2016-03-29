/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers';
import Hello from './components/Hello';
import About from './components/about';

const store = createStore(
	combineReducers({
		...reducers,
		routing: routerReducer
	})
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore( browserHistory, store );

export default function App() {
	return ReactDOM.render(
		<Provider store={ store }>
			<Router history={ history }>
				<Route path="/" component={ Hello }></Route>
				<Route path="/about" component={ About }></Route>
			</Router>
		</Provider>,
		document.getElementById( 'mount' )
	);
};
