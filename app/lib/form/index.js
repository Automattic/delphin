/* eslint no-unused-vars: 0 */

// External dependencies
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import flow from 'lodash/flow';
import omit from 'lodash/omit';

// Internal dependencies
import phone from './phone.json';
import { recordTracksEvent } from 'actions/analytics';

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

/***
 * Tracks errors
 * @param {Array} errors the errors array
 * @returns {Function} thunk that dispatches all the errors
 */
const trackErrors = ( errors ) => dispatch => {
	errors.forEach( ( error ) => dispatch( recordTracksEvent( 'delphin_client_validation_error', omit( error, 'errorMessage' ) ) ) );
};

/***
 * Transforms errors from errors array to redux errors object
 * @param {Array} errors errors definition array
 * @returns {Object} errors object where each property is the field with it's error
 */
const transformErrorsToReduxFormErrors = ( errors ) =>
	errors.reduce( ( accumlatedValue, currentError ) => Object.assign( accumlatedValue, {
		[ currentError.field ]: currentError.errorMessage
	} ), {} );

/***
 * Transforms errors object to a promise
 * @param {Object} errors redux form errors object
 * @returns {Promise} resolved/rejected based on whether we have errors
 */
export const getAsyncErrorsFunction = errors => () => new Promise( ( resolve, reject ) => {
	if ( isEmpty( errors ) ) {
		resolve();
	} else {
		reject( errors );
	}
} );

/***
 * A helper to capture dispatch from redux form
 * @returns {Object} object with captureDispatch and bindActionCreator helpers that has internal state
 */
const getFormAsyncValidationHelpers = () => {
	let dispatch = null;

	return {
		captureDispatch: ( values, capturedDispatch ) => {
			dispatch = capturedDispatch;
			return values;
		},
		bindActionCreator: ( actionCreator ) => ( ...args ) => dispatch( actionCreator( ...args ) )
	};
};

/***
 * Creates an async validation function with tracking
 * @param {function} validate - Validate function that returns an array conaining error description
 * @return {function} Function that returns a promise that is resolved/rejected based on errors in the
 * given validate function.
 */
export const getAsyncValidateFunctionWithTracking = ( validate ) => {
	const formHelpers = getFormAsyncValidationHelpers();
	return flow( formHelpers.captureDispatch, validate, formHelpers.bindActionCreator( trackErrors ), transformErrorsToReduxFormErrors, getAsyncErrorsFunction );
};
