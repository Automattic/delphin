// External dependencies
import i18n from 'i18n-calypso';
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
 * Retrieves a host name from the specified url.
 *
 * @param {string} url - url
 * @returns {string|null} the corresponding host name, or null if not found
 */
export function extractHostName( url ) {
	url = url.trim();

	// Prepares the url for parsing by removing or converting invalid characters
	if ( url ) {
		url = url.replace( /\\/g, '/' );
		url = url.replace( /[()]/g, '' );
	}

	const data = parseDomain( url );

	if ( data ) {
		const { subdomain, domain, tld } = data;

		if ( domain && tld ) {
			const parts = [ domain, tld ];

			if ( subdomain ) {
				parts.unshift( subdomain );
			}

			return parts.join( '.' );
		}
	}

	return null;
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
 * Normalizes the given domain name.
 *
 * @param {string} domain - raw domain name
 * @returns {string} - the domain name normalized
 */
export function normalizeDomain( domain ) {
	return domain.trim().toLowerCase();
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
	return isDomain( value ) && domainEndsInAvailableTldRegEx.test( value );
}

/**
 * Returns a boolean representing whether the results contain a match for the query.
 *
 * @param {array} results - An array of domain suggestions
 * @param {string} query - A search query
 * @returns {boolean} - Whether there is a match for the given query.
 */
export const queryIsInResults = ( results, query ) => (
	results.some( result => result.domainName === query || secondLevelDomainOf( result.domainName ) === query )
);

/**
 * Strips all characters after the last period
 *
 * @param {string} string - the string to update
 * @return {string} - the updated string
 */
export const omitTld = ( string = '' ) => string.replace( /\.(.*)/g, '' );

/**
 * Adds the tld to a domain if it's not already there (or replaces it if it's not the given tld)
 *
 * @param {string} domain - the domain string to fix
 * @param {string} tld - the tld that will be used
 * @return {string} - the updated domain with the tld
 */
export const withTld = ( domain = '', tld = config( 'default_tld' ) ) => domain.replace( /^([a-z0-9\-]+)(\.\w+)?$/g, '$1.' + tld );

const reservedDomains = [ 'get', 'nic', 'dave', 'design', 'blacknight', 'matt' ];

/**
 * Determines if the given query contains at least one alphanumeric character.
 *
 * @param {string} query - A search query
 * @return {boolean} - A flag representing whether the given query contains at
 * least one alphanumeric character.
 */
export const containsAlphanumericCharacters = query => query.replace( /\W+/g, '' ).length > 0;

/**
 * Returns validation messages for the given domain.
 *
 * @param {string} domain - domain to validate.
 * @return {string} - String that may contain validation messages.
 */
export const validateDomain = domain => {
	if ( ! domain ) {
		return i18n.translate( 'Please enter a domain name.' );
	}

	domain = domain.toLowerCase();
	domain = domain.trim();
	domain = domain.replace( /\.blog$/gi, '' );

	if ( domain === '' ) {
		return i18n.translate( 'Please enter a domain name.' );
	}

	if ( domain.length < 4 ) {
		return i18n.translate( 'Choose a longer domain, at least four characters.' );
	}

	if ( domain.length > 63 ) {
		return i18n.translate( 'Choose a shorter domain, up to 63 characters (not including the ".blog" part).' );
	}

	if ( domain.charAt( 0 ) === '-' ) {
		return i18n.translate( 'Don’t use a "-" (hyphen) as the first character in your domain.' );
	}

	if ( domain.charAt( domain.length - 1 ) === '-' ) {
		return i18n.translate( 'Don’t use a "-" (hyphen) as the last character in your domain.' );
	}

	if ( domain.indexOf( '.' ) > -1 ) {
		return i18n.translate( 'Don’t use a "." (period) in your domain.' );
	}

	if ( reservedDomains.indexOf( domain ) > -1 ) {
		return i18n.translate( 'The domain %(domain)s is not available for registration.', {
			args: {
				domain: withTld( domain )
			}
		} );
	}

	if ( ! isDomain( withTld( domain ) ) ) {
		return i18n.translate( 'Use only lowercase letters, numbers, and hyphens (a to z, 0 to 9, and -). Spaces or other characters are not supported.' );
	}

	return null;
};
