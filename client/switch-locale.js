// External dependencies
import config from 'config';
import request from 'superagent';
import i18n from 'i18n-calypso';
import debugFactory from 'debug';
const debug = debugFactory( 'delphin:i18n' );

// Internal dependencies
import { setLocaleCookie } from './locale-cookie';

function languageFileUrl( localeSlug ) {
	let protocol = typeof window === 'undefined' ? 'https://' : '//', // use a protocol-relative path in the browser
		localeJson = `${ protocol }widgets.wp.com/languages/delphin/${ localeSlug }.json`;
	return localeJson;
}

function switchLocale( localeSlug ) {
	setLocaleCookie( localeSlug );

	if ( localeSlug === config( 'i18n_default_locale_slug' ) ) {
		// sets the locale back to the default
		i18n.setLocale();
		return;
	}

	request.get( languageFileUrl( localeSlug ) ).end( function( error, response ) {
		if ( error ) {
			debug( 'Encountered an error loading locale file for ' + localeSlug + '. Falling back to English.' );
			return;
		}
		i18n.setLocale( response.body );
	} );
}

export default switchLocale;
