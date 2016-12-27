// External dependencies
import get from 'lodash/get';

/**
 * Retrieves the country code from the contact information entered.
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the country code, or null if not found
 */
export const getCountryCode = ( state ) => {
	return get( state, 'form.contactInformation.countryCode.value' );
};

/**
 * Retrieves the full name of the user from the contact information entered.
 *
 * @param {object} state - global state tree
 * @returns {string} - the full name, or an empty string
 */
export const getFullName = ( state ) => {
	if ( ! state.form.contactInformation ) {
		return '';
	}

	const { firstName: { value: firstName }, lastName: { value: lastName } } = state.form.contactInformation;

	return `${ firstName } ${ lastName }`;
};

/**
 * Retrieves the postal code from the contact information entered.
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the postal code, or null if not found
 */
export const getPostalCode = ( state ) => {
	return get( state, 'form.contactInformation.postalCode.value' );
};
