/* eslint no-unused-vars: 0 */

// External dependencies
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

// Internal dependencies
import phone from './phone.json';

/**
 * Creates a new validate function that returns a promise.
 *
 * @param {function} validate - Validate function that returns an object containing errors for a form.
 * @return {function} Function that returns a promise that is resolved/rejected based on errors in the
 * given validate function.
 */
export const getAsyncValidateFunction = validate => values => new Promise( ( resolve, reject ) => {
	const errors = validate( values );

	if ( isEmpty( errors ) ) {
		resolve();
	} else {
		reject( errors );
	}
} );

/**
 * Retrieves the calling code for the specified country.
 *
 * @param {string} countryCode - country code (ISO 3166-1 alpha-2 identifier)
 * @returns {string} - the corresponding calling code or an empty string if not found
 */
export const getCallingCode = countryCode => phone[ countryCode ] || '';

/**
 * Masks the specified number to only allow numbers and the plus sign.
 *
 * @param {string} nextPhoneNumber - new phone number
 * @param {string} currentPhoneNumber - previous phone number
 * @returns {string} - the new phone number with only allowed characters
 */
export const maskPhone = ( nextPhoneNumber, currentPhoneNumber ) => {
	let digits = '';

	if ( isString( nextPhoneNumber ) ) {
		// Allows the removal of a single plus sign
		if ( nextPhoneNumber === '' && currentPhoneNumber === '+' ) {
			return nextPhoneNumber;
		}

		digits = nextPhoneNumber.replace( /[^0-9]/g, '' );
	}

	return `+${ digits }`;
};

/**
 * Gets a value of a redux field based on it's dirty status
 *
 * @param {Object} field - redux field
 * @returns {String|Object|Number} - initial value or current value if the field is dirty
 */
export const getFieldValue = ( field ) => field.dirty ? field.value : field.initialValue;

/**
 * Extracts valid props to be given to a form element from an object (a set of props) containing other fields. This
 * function basically removes all custom props added by redux-form:
 *
 *   https://github.com/erikras/redux-form/issues/1249
 *
 * This function should be removed once redux-form is upgraded to version 6.
 *
 * @param {object} props - a set of props for a form element
 * @returns {object} - the props filtered
 */
export const removeInvalidInputProps = ( props ) => {
	const {
		active,
		autofill,
		autofilled,
		dirty,
		error,
		initialValue,
		invalid,
		onUpdate,
		pristine,
		touched,
		valid,
		visited,
		...validProps
	} = props;

	return validProps;
};
