/**
 * External dependencies
 */
import debugFactory from 'debug';
const debug = debugFactory( 'delphin:sift-science' );

/**
 * Internal dependencies
 */
import config from 'config';
import loadScript from 'lib/load-script';

const SIFT_SCIENCE_URL = 'https://cdn.siftscience.com/s.js';

let hasLoaded = false;

if ( process.env.BROWSER && ! window._sift ) {
	window._sift = [];
}
/**
 * Expose `SiftScience`
 */
module.exports = {
	recordUser: function( userId ) {
		if ( ! process.env.BROWSER ) {
			return;
		}

		if ( ! hasLoaded ) {
			window._sift.push( [ '_setAccount', config( 'sift_science_key' ) ] );
			window._sift.push( [ '_setUserId', userId ] );
			window._sift.push( [ '_trackPageview' ] );

			hasLoaded = true;
			loadScript.loadScript( SIFT_SCIENCE_URL, function( error ) {
				if ( error ) {
					debug( 'Error loading SiftScience' );
				} else {
					debug( 'SiftScience loaded successfully' );
				}
			} );
		}
	}
};
