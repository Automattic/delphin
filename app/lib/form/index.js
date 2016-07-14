/* eslint no-unused-vars: 0 */

// External dependencies
import isEmpty from 'lodash/isEmpty';

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
 * Extract valid props to be given to an <input> element from an object (a set of props) containing other fields.
 * This function basically removes all custom props added by react-form.
 * See this issue in react-form: https://github.com/erikras/redux-form/issues/1249#
 *
 * @param {object} props   - a set of props for an input element
 * @returns {object} props filtered
 */
export const removeInvalidInputProps = ( props ) => {
	const { active, autofill, autofilled, dirty, error, initialValue, invalid, onUpdate, pristine, touched,
			valid, visited, asyncValidating, autofocus, ...validProps } = props;
	return validProps;
};
