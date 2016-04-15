// Internal dependencies
import About from 'components/ui/about';
import Checkout from 'components/ui/checkout';
import Hello from 'components/ui/hello';
import Root from 'components/ui/root';
import SearchContainer from 'components/containers/search';
import Success from 'components/ui/success';

export default {
	path: '/',
	component: Root,
	indexRoute: { component: SearchContainer },
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
			path: 'checkout',
			component: Checkout
		},
		{
			path: 'success',
			component: Success
		}
	]
};

export const serverRedirectRoutes = [
	{
		from: 'checkout',
		to: 'search'
	},
	{
		from: 'success',
		to: 'search'
	}
];
