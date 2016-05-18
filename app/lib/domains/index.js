// External dependencies
import parseDomain from 'parse-domain';

// Internal dependencies
import config from 'config';

const domainEndsInAvailableTldRegEx = new RegExp( '\\.(?:' + config( 'available_tlds' ).join( '|' ) + ')$', 'i' );

/**
 * Check if a string is a valid domain.
 * It does not handle all cases such as 1-letter domains
 *
 * @param {string} value - the string to test
 * @returns {boolean}    - the result of the test
 */
export function isDomain( value ) {
	// handle special cases first such as '.hello.com' which is parsed to
	// { tld: 'com', domain: 'hello', subdomain: '' } by the parse-domain lib
	if ( typeof value !== 'string' || value.charAt( 0 ) === '.' ) {
		return false;
	}

	const parsedDomain = parseDomain( value );

	// A domain is valid if it can be parsed by the lib and it has a domain, a tld but no subdomain
	return !! parsedDomain &&
		parsedDomain.tld &&
		isValidSecondLevelDomain( parsedDomain.domain ) &&
		! parsedDomain.subdomain;
}

/**
 * Check if a string is a valid second level domain.
 *
 * @param {string} value - the string to test
 * @returns {boolean}    - the result of the test
 */
export function isValidSecondLevelDomain( value ) {
	return !! value && /^[a-zA-Z0-9][a-zA-Z0-9-]{0,251}[a-zA-Z0-9]$/i.test( value );
}

/**
 * Extract the second level domain from a valid domain
 *
 * @param {string} validDomain - a valid domain to extract the sld from
 * @returns {boolean}          - the sld
 */
export function secondLevelDomainOf( validDomain ) {
	const parsedDomain = parseDomain( validDomain );
	return parsedDomain && parsedDomain.domain || '';
}

/**
 * Test if a search query can match an exact domain
 *
 * @param {string} value - the string to test
 * @returns {boolean}    - the result of the test
 */
export function isDomainSearch( value ) {
	return isValidSecondLevelDomain( value ) || ( isDomain( value ) && domainEndsInAvailableTldRegEx.test( value ) );
}
