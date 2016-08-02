// External dependencies
import cookieFactory from 'cookie-dough';

const cookies = cookieFactory();

export const setLocaleCookie = locale => cookies.set( 'locale', locale, {
	maxAge: 30 * 24 * 60 * 60,
	path: '/'
} );
