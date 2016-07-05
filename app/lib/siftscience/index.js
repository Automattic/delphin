/**
 * External dependencies
 */
import debugFactory from 'debug';
const debug = debugFactory( 'delphin:siftscience' );

/**
 * Internal dependencies
 */
import config from 'config';
import loadScript from 'lib/load-script';

const SIFTSCIENCE_URL = 'https://cdn.siftscience.com/s.js';

let hasLoaded = false;

if ( ! window._sift ) {
	window._sift = [];
}
/**
 * Expose `SiftScience`
 */
module.exports = {
	recordUser: function( userId ) {
		if ( ! hasLoaded ) {
			window._sift.push( [ '_setAccount', config( 'siftscience_key' ) ] );
			window._sift.push( [ '_setUserId', userId ] );
			window._sift.push( [ '_trackPageview' ] );

			hasLoaded = true;
			loadScript.loadScript( SIFTSCIENCE_URL, function( error ) {
				if ( error ) {
					debug( 'Error loading siftscience' );
				} else {
					debug( 'siftscience loaded successfully' );
				}
			} );
		}
	}
};
