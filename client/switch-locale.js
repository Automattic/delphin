
import request from 'superagent';
import i18n from 'i18n-calypso';

function languageFileUrl( localeSlug ) {
	var protocol = typeof window === 'undefined' ? 'https://' : '//', // use a protocol-relative path in the browser
		localeJson = `${ protocol }widgets.wp.com/languages/calypso/${ localeSlug }.json`;
	return localeJson;
}

function switchLocale( localeSlug ) {
	request.get( languageFileUrl( localeSlug ) ).end( function( error, response ) {
		if ( error ) {
			console.error( 'Encountered an error loading locale file for ' + localeSlug + '. Falling back to English.' );
			return;
		}
		i18n.setLocale( response.body );
	} );
}

module.exports = switchLocale;
