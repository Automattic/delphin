const NODE_ENV = process.env.NODE_ENV;

const config = {
	env: process.env.NODE_ENV || 'development',
	i18n_default_locale_slug: 'en',
	boom_analytics_enabled: false,
	mc_analytics_enabled: NODE_ENV === 'production'
};

export default function( key ) {
	return config[ key ];
}
