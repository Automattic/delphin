// Internal dependencies
import About from 'components/ui/about';
import Checkout from 'components/ui/checkout';
import Hello from 'components/ui/hello';
import paths from 'paths';
import Root from 'components/ui/root';
import SearchContainer from 'components/containers/search';
import Success from 'components/ui/success';

export default {
	path: paths.home(),
	component: Root,
	indexRoute: { component: SearchContainer },
	childRoutes: [
		{
			path: 'hello',
			component: Hello
		},
		{
			path: paths.about(),
			component: About
		},
		{
			path: paths.checkout(),
			component: Checkout
		},
		{
			path: paths.success(),
			component: Success
		}
	]
};

export const serverRedirectRoutes = [
	{
		from: paths.checkout(),
		to: paths.search()
	},
	{
		from: paths.success(),
		to: paths.search()
	}
];
