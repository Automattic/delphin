/**
 * External dependencies
 */
import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';

/**
 * Internal dependencies
 */
import { About, Hello, Root, Search, Checkout, Success } from './components';

export default function App( { history } ) {
	return (
		<Router history={ history }>
			<Route path="/" component={ Root }>
				<IndexRoute component={ Search } />
				<Route path="/hello" component={ Hello } />
				<Route path="/about" component={ About } />
				<Route path="/search" component={ Search } />
				<Route path="/checkout" component={ Checkout } />
				<Route path="/success" component={ Success } />
			</Route>
		</Router>
	);
}
