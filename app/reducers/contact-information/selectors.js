// External dependencies
import get from 'lodash/get';

/**
 * Retrieves the country code from the domain contact information form.
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the country code, or null if not found
 */
export const getCountryCode = ( state ) => {
	return get( state, 'form.contactInformation.countryCode.value' );
};

/**
 * Retrieves the postal code from the domain contact information form.
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the postal code, or null if not found
 */
export const getPostalCode = ( state ) => {
	return get( state, 'form.contactInformation.postalCode.value' );
};
