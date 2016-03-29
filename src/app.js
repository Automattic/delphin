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
import reducers from './reducers';
import { About, Hello, Root, Search, Checkout } from './components';

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

export default function App() {
	return ReactDOM.render(
		<Provider store={ store }>
			<Router history={ history }>
				<Route path="/" component={ Root }>
					<Route path="/hello" component={ Hello } />
					<Route path="/about" component={ About } />
					<Route path="/search" component={ Search } />
					<Route path="/checkout" component={ Checkout } />
				</Route>
			</Router>
		</Provider>,
		document.getElementById( 'content' )
	);
};
