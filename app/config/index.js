// Internal dependencies
import languages from './languages';

const NODE_ENV = process.env.NODE_ENV,
	productionOnly = NODE_ENV === 'production';

const config = {
	env: NODE_ENV || 'development',
	tracks_event_prefix: 'delphin_',
	languages,
	features: {
		boom_analytics_enabled: productionOnly,
		google_analytics_enabled: productionOnly,
		mc_analytics_enabled: productionOnly
	}
};

export default function( key ) {
	return config[ key ];
}

export function isEnabled( feature ) {
	return config.features[ feature ];
}
