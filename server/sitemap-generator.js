// External dependencies
import path from 'path';
import SiteMap from 'react-router-sitemap';

// Internal dependencies
import config from 'app/config';
import { routes } from 'app/routes';

// exclude some paths
const filterConfig = {
	isValid: false,
	rules: [
		/\/contact-information/,
		/\/confirm-domain/,
		/\/verify/,
		/\/checkout/,
		/\/checkout-review/,
		/\/about\/testnest/,
		/\/sign-in-with-email/,
		/\/sign-up-with-email/,
		/\/success/,
		/\/about/
	]
};

export default () => (
	new SiteMap( routes )
		.filterPaths( filterConfig )
		.build( 'https://' + config( 'hostname' ) )
		.save( path.join( __dirname, '..', 'public', 'static', 'sitemap.xml' ) )
);
