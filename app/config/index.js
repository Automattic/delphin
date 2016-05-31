// Internal dependencies
import languages from './languages';

const NODE_ENV = process.env.NODE_ENV,
	productionOnly = NODE_ENV === 'production';

const config = {
	available_tlds: [ 'live' ],
	default_tld: 'live',
	default_search_sort: 'recommended',
	env: NODE_ENV || 'development',
	i18n_default_locale_slug: 'en',
	initial_number_of_search_results: 6,
	features: {
		boom_analytics_enabled: productionOnly,
		google_analytics_enabled: productionOnly,
		mc_analytics_enabled: productionOnly
	},
	languages,
	tracks_event_prefix: 'delphin_',
	wordpress: {
		rest_api_oauth_client_id: 46199,
		rest_api_oauth_client_secret: '7FVcj4q9nDvX3ic812oAGDR2oZFjSk0woryR0rRmNIO5Gn7k6HibTIlhvC7Wmof9'
	},
	wordnik_api_key: '***REMOVED***'
};

export default function( key ) {
	return config[ key ];
}

export function isEnabled( feature ) {
	return config.features[ feature ];
}
