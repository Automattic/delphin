// Internal dependencies
import languages from './languages';
import { applyQueryStringToFeatures } from 'lib/config';

const NODE_ENV = process.env.NODE_ENV,
	productionOnly = NODE_ENV === 'production';

const config = {
	available_tlds: [ 'blog' ],
	default_tld: 'blog',
	default_search_sort: 'recommended',
	env: NODE_ENV || 'development',
	staging_cdn_prefix: 'https://s0.wp.com/wp-content/themes/a8c/getdotblogstaging/public',
	production_cdn_prefix: 'https://s0.wp.com/wp-content/themes/a8c/getdotblog/public',
	google_conversion_id: 881304566,
	google_conversion_label: 'WLR1CIHt3WkQ9seepAM',
	bing_tag_id: '5476898',
	quantcast_account_id: 'p--q2ngEqybdRaX',
	facebook_pixel_id: '275189776211205',
	hostname: 'get.blog',
	i18n_default_locale_slug: 'en',
	initial_number_of_search_results: 6,
	features: {
		ad_tracking: productionOnly,
		boom_analytics: productionOnly,
		google_analytics: productionOnly,
		mc_analytics: productionOnly,
		sentry: productionOnly,
		tracks: productionOnly,
		googleads: productionOnly,
		bingads: productionOnly,
		quantcast: productionOnly,
		facebookads: productionOnly
	},
	languages,
	sift_science_key: productionOnly ? 'a4f69f6759' : 'e00e878351',
	support_link: 'mailto:help@get.blog',
	tracks_event_prefix: 'delphin_',
	wordpress: {
		rest_api_oauth_client_id: 46199,
		rest_api_oauth_client_secret: '7FVcj4q9nDvX3ic812oAGDR2oZFjSk0woryR0rRmNIO5Gn7k6HibTIlhvC7Wmof9'
	},
	wordnik_api_key: '0a2ae295fc390957bd00807a19d093fb5c8ea6aaa2f1d55a0',
	google_analytics_key: 'UA-10673494-28',
	google_translate_api_key: 'AIzaSyBgMoRbT8VSbHD4G9Exdog3g7cFE4TXuPU'
};

if ( typeof window !== 'undefined' && window.location && window.location.search ) {
	// allow us to update `config.features` with the query string only in development
	config.features = applyQueryStringToFeatures( config.features, window.location.search );
}

export default function( key ) {
	return config[ key ];
}

export function isEnabled( feature ) {
	return config.features[ feature ];
}
