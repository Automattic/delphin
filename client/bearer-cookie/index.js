// External dependencies
import cookieFactory from 'cookie-dough';

const cookies = cookieFactory();

/**
 * Retrieves the bearer token from a cookie.
 *
 * @returns {undefined|string} the bearer token or undefined if not found
 */
export function getTokenFromBearerCookie() {
	return cookies.get( 'wpcom_token' );
}

/**
 * Deletes the bearer cookie.
 *
 * @returns {boolean} true if the bearer cookie was deleted, false otherwise
 */
export function removeBearerCookie() {
	return cookies.remove( 'wpcom_token', { path: '/' } );
}

/**
 * Saves the specified bearer token into a cookie for one day.
 *
 * @param {string} bearerToken - access token
 */
export function saveTokenInBearerCookie( bearerToken ) {
	cookies.set( 'wpcom_token', bearerToken, {
		maxAge: 24 * 60 * 60,
		path: '/'
	} );
}
