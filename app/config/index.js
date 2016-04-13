
const config = {
	env: 'development',
	i18n_default_locale_slug: 'en',
};

export default function( key ) {
	return config[ key ];
}
