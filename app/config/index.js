const config = {
	env: process.env.NODE_ENV,
	i18n_default_locale_slug: 'en'
};

export default function( key ) {
	return config[ key ];
}
