/**
 * Internal dependencies
 */
import About from 'components/ui/about';
import Hello from 'components/ui/hello';
import Root from 'components/ui/root';
import Search from 'components/ui/search';
import Checkout from 'components/ui/checkout';
import Success from 'components/ui/success';

export default {
	path: '/',
	component: Root,
	indexRoute: { component: Search },
	childRoutes: [
		{
			path: 'hello',
			component: Hello
		},
		{
			path: 'about',
			component: About
		},
		{
			path: 'search',
			component: Search
		},
		{
			path: 'checkout',
			component: Checkout
		},
		{
			path: 'success',
			component: Success
		}
	]
};
