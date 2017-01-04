/* eslint no-unused-vars: 0 */

// External dependencies
import i18n from 'i18n-calypso';
import invert from 'lodash/invert';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

// Internal dependencies
import phone from './phone.json';

const countryCodes = invert( phone );

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
 * Retrieves the country code for the specified calling code.
 *
 * @param {string} callingCode - the calling code of a phone number
 * @returns {string} - the corresponding country code (ISO 3166-1 alpha-2 identifier)
 */
export const getCountryFromCallingCode = callingCode => countryCodes[ callingCode ] || '';

/**
 * Tries to find the calling code for a given phone number
 *
 * @param {string} phoneNumber - a phone number
 * @param {string} countryCode - a country code to help the guess
 * @returns {string} - the calling code found
 */
export const guessCallingCode = ( phoneNumber = '', countryCode = '' ) => {
	if ( phoneNumber.includes( '.' ) ) {
		const matches = /^\+?(\d+)\./.exec( phoneNumber );
		return matches && matches[ 1 ];
	}

	// no . given, let's guess the country code

	// if the number does not start with +, assumes the calling code is not part of it
	if ( ! phoneNumber.startsWith( '+' ) ) {
		return '';
	}

	// if a country code is given try to use it to extract the calling code
	if ( countryCode ) {
		const countryCallingCode = getCallingCode( countryCode );

		// if it starts with the country code of the user's country,
		// it's easy, we just extract it
		if ( phoneNumber.startsWith( '+' + countryCallingCode ) ) {
			return countryCallingCode;
		}
	}

	let phonePrefix = '';
	for ( let i = 2; i <= phoneNumber.length; i++ ) {
		phonePrefix = phoneNumber.substring( 1, i );
		if ( getCountryFromCallingCode( phonePrefix ) ) {
			return phonePrefix;
		}
	}

	return '';
};

/**
 * Masks the specified number to only allow numbers, a plus sign and a single dot.
 *
 * @param {string} nextPhoneNumber - new phone number
 * @param {string} currentPhoneNumber - previous phone number
 * @returns {string} - the new phone number with only allowed characters
 */
export const maskPhone = ( nextPhoneNumber, currentPhoneNumber ) => {
	let newPhoneNumber = '';

	if ( isString( nextPhoneNumber ) ) {
		// Allows the user to removes the plus sign and clears the country calling code field
		if ( nextPhoneNumber === '' && currentPhoneNumber === '+' ) {
			return nextPhoneNumber;
		}

		newPhoneNumber = nextPhoneNumber.replace( /[^0-9\.]/g, '' );

		// Removes all dots except the first one
		const [ countryCallingCode, ...phoneNumber ] = newPhoneNumber.split( '.' );

		if ( phoneNumber.length > 0 ) {
			newPhoneNumber = countryCallingCode + '.' + phoneNumber.join( '' );
		}
	}

	return `+${ newPhoneNumber }`;
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
