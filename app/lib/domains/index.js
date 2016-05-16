/**
 * Check if a string is a valid domain name.
 * It does not handle all cases such as "hello-.com" (which should not be allowed) to keep the test simple
 *
 * @param {string} value - the string to test
 * @returns {boolean}    - the result of the test
 */
export function isDomainName( value ) {
	return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,252}\.[a-zA-Z]{2,}$/i.test( value );
}
