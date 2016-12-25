/* eslint no-unused-vars: 0 */

// External dependencies
import i18n from 'i18n-calypso';
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
export const getAsyncValidateFunction = validate => ( values, dispatch, props ) => new Promise( ( resolve, reject ) => {
	const errors = validate( values, dispatch, props );

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
 * Determines whether the given number is a calling code.
 *
 * @param {number} number - Any number
 * @returns {boolean} - Whether the given number is a calling code.
 */
export const isCallingCode = number => {
	for ( const countryCode in phone ) {
		if ( phone.hasOwnProperty( countryCode ) && parseInt( phone[ countryCode ] ) === number ) {
			return true;
		}
	}

	return false;
};

/**
 * Masks the specified number to only allow numbers and the plus sign.
 *
 * @param {string} nextPhoneNumber - new phone number
 * @returns {string} - the new phone number with only allowed characters
 */
export const maskPhone = ( nextPhoneNumber ) => {
	let digits = '';

	if ( isString( nextPhoneNumber ) ) {
		digits = nextPhoneNumber.replace( /[^0-9\.]/g, '' );
	}

	return `+${ digits }`;
};

/***
 * Formats a phone number with a dot after country's calling code
 *
 * @param {String} phoneNumber phone number string starting with a '+'
 * @param {String} countryCode country code, such as 'US' or 'IL
 * @returns {String} a number formmated with a dot
 */
export const formatPhoneWithInternationalDot = ( phoneNumber, countryCode ) => {
	if ( ! countryCode ) {
		return phoneNumber;
	}

	const callingCode = getCallingCode( countryCode );
	const phonePrefix = `+${ callingCode }`;
	const hasCallingCode = phoneNumber.indexOf( phonePrefix ) === 0;
	const phoneNumberIsNotJustPrefix = hasCallingCode && phoneNumber.length > phonePrefix.length;
	const hasDot = phoneNumberIsNotJustPrefix && phoneNumber[ phonePrefix.length ] === '.';

	if ( hasCallingCode && phoneNumberIsNotJustPrefix && ! hasDot ) {
		return phonePrefix + '.' + phoneNumber.substring( phonePrefix.length );
	}

	return phoneNumber;
};

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

/**
 * Focuses the given node if it is an input or select, or the descendant select
 * or input of the given node.
 *
 * @param {elementNodeReference} node - Node for a given field component like `Input`
 */
export const focusField = node => {
	if ( [ 'select', 'input' ].indexOf( node.tagName.toLowerCase() ) > -1 ) {
		node.focus();
		return;
	}

	const field = node.querySelector( 'input, select' );

	if ( field ) {
		field.focus();
	}
};

/**
 * Regex which matches an email address
 */
export const emailValidator = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$';

/**
 * Returns validation messages for the given email.
 *
 * @param {string} email - email address to validate.
 * @return {string} - String that may contain validation messages.
 */
export const validateEmail = email => {
	if ( ! email ) {
		return i18n.translate( 'Enter your email address.' );
	}

	if ( ! new RegExp( emailValidator ).test( email ) ) {
		return i18n.translate( 'Enter a valid email address.' );
	}

	return null;
};
