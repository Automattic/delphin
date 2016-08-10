// Internal dependencies
import languages from './languages';

const NODE_ENV = process.env.NODE_ENV,
	productionOnly = NODE_ENV === 'production';

const config = {
	available_tlds: [ 'blog' ],
	default_tld: 'blog',
	default_search_sort: 'recommended',
	env: NODE_ENV || 'development',
	i18n_default_locale_slug: 'en',
	initial_number_of_search_results: 6,
	features: {
		boom_analytics_enabled: productionOnly,
		google_analytics_enabled: productionOnly,
		mc_analytics_enabled: productionOnly,
		tracks_enabled: productionOnly
	},
	languages,
	sift_science_key: productionOnly ? 'a4f69f6759' : 'e00e878351',
	support_link: 'mailto:help@get.blog',
	tracks_event_prefix: 'delphin_',
	wordpress: {
		rest_api_oauth_client_id: 46199,
		rest_api_oauth_client_secret: '7FVcj4q9nDvX3ic812oAGDR2oZFjSk0woryR0rRmNIO5Gn7k6HibTIlhvC7Wmof9'
	},
	wordnik_api_key: '***REMOVED***',
	google_translate_api_key: '***REMOVED***'
};

export default function( key ) {
	return config[ key ];
}

export function isEnabled( feature ) {
	return config.features[ feature ];
}
