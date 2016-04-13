/**
 * External dependencies
 */
import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';

/**
 * Internal dependencies
 */
import About from 'components/ui/about';
import Hello from 'components/ui/hello';
import Root from 'components/ui/root';
import Search from 'components/ui/search';
import Checkout from 'components/ui/checkout';
import Success from 'components/ui/success';

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
