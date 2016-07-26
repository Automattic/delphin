/* eslint no-unused-vars: 0 */

// External dependencies
import isEmpty from 'lodash/isEmpty';

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
