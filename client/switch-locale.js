
import request from 'superagent';
import i18n from 'i18n-calypso';
import debugFactory from 'debug';
const debug = debugFactory( 'delphin:i18n' );

function languageFileUrl( localeSlug ) {
	var protocol = typeof window === 'undefined' ? 'https://' : '//', // use a protocol-relative path in the browser
		localeJson = `${ protocol }widgets.wp.com/languages/calypso/${ localeSlug }.json`;
	return localeJson;
}

function switchLocale( localeSlug ) {
	request.get( languageFileUrl( localeSlug ) ).end( function( error, response ) {
		if ( error ) {
			debug( 'Encountered an error loading locale file for ' + localeSlug + '. Falling back to English.' );
			return;
		}
		i18n.setLocale( response.body );
	} );
}

export default switchLocale;
