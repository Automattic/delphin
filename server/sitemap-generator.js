// External dependencies
import path from 'path';
import SiteMap from 'react-router-sitemap';

// Internal dependencies
import config from 'app/config';
import { routes } from 'app/routes';

// Builds a list of non-English locales to use in the regular expressions below
const locales = config( 'languages' ).filter( language => {
	return language.langSlug !== 'en';
} ).map( language => {
	return language.langSlug;
} ).join( '|' );

// Includes only very specific routes in the sitemap
const filterConfig = {
	isValid: true,
	rules: [
		new RegExp( `^\/(${ locales })?$` ),
		new RegExp( `^(?:\/(${ locales }))?\/learn-more$` ),
		new RegExp( `^(?:\/(${ locales }))?\/search$` )
	]
};

export default () => {
	console.log( 'sitemap.xml written' );

	new SiteMap( routes )
		.filterPaths( filterConfig )
		.build( 'https://' + config( 'hostname' ) )
		.save( path.join( __dirname, '..', 'public', 'static', 'sitemap.xml' ) );
};
