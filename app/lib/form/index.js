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
