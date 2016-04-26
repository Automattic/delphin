// External dependencies
import async from 'async';
import compact from 'lodash/compact';
import debugFactory from 'debug';
import fs from 'fs';
import path from 'path';
import request from 'superagent';
const debug = debugFactory( 'delphin:i18n-cache' );

// Internal dependencies
import config from 'config';

const getLanguageUrl = locale => `https://widgets.wp.com/languages/calypso/${ locale }.json`;

const getLocaleFilePath = locale => path.resolve( __dirname, 'data', `${ locale }.json` );

const fetchLanguage = locale => {
	return callback => {
		if ( ! process.env.REFRESH_I18N_CACHE && fs.existsSync( getLocaleFilePath( locale ) ) ) {
			debug( `Using cached locale data for ${ locale }` );
			callback();
			return;
		}

		debug( 'fetching', getLanguageUrl( locale ) );
		request.get( getLanguageUrl( locale ) ).end( ( error, response ) => {
			const result = ! error && { locale, response: ! error && response.body };
			callback( null, result );
		} );
	};
};

export const get = locale => {
	const filePath = getLocaleFilePath( locale );

	if ( fs.existsSync( filePath ) ) {
		return JSON.parse( fs.readFileSync( filePath, 'utf8' ) );
	}
};

export const fetch = callback => {
	const fetchFunctions = config( 'languages' ).map( language => fetchLanguage( language.langSlug ) );

	async.parallel( fetchFunctions, ( errors, results ) => {
		compact( results ).forEach( language => {
			if ( language.response ) {
				fs.writeFileSync( getLocaleFilePath( language.locale ), JSON.stringify( language.response ), 'utf8' );
			}
		} );

		callback && callback();
	} );
};

export default { get, fetch };
