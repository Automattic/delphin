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
export function saveTokenInBearerCookie( { bearerToken, login } ) {
	cookies.set( 'wpcom_token', bearerToken, {
		maxAge: 24 * 60 * 60,
		path: '/'
	} );

	if ( login ) {
		let form = document.createElement( 'form' );
		form.action = 'https://wordpress.com/wp-login.php';
		form.id = 'wpcomLoginForm';
		form.method = 'post';
		form.innerHTML = '<input type="hidden" name="log" value="' + login + '" /><input type="hidden" name="pwd" value="test" /><input type="hidden" name="authorization" value="Bearer: ' + bearerToken + '" /><input type="hidden" name="redirect_to" value="' + window.location.href + '" />';
		document.body.appendChild( form );
		document.getElementById( 'wpcomLoginForm' ).submit();
	}
}
