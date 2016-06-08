// Internal dependencies
import { camelize } from 'lib/formatters';

/**
 * Resolves discrepencies between mismatched key names for contact information between Delphin and the API.
 * Currently, this means camelCasing each key name, and combining `firstName` and `lastName` into a single
 * `name` property.
 *
 * @param {object} errors - Map of fields:error to normalize.
 * @return {object} - New map of errors.
 */
export const normalizeValidationErrors = errors => {
	errors = camelize( errors );

	return Object.keys( errors ).reduce( ( result, fieldName ) => {
		let newFieldName;

		if ( fieldName === 'firstName' || fieldName === 'lastName' ) {
			newFieldName = 'name';
		} else {
			newFieldName = fieldName;
		}

		if ( result[ newFieldName ] ) {
			result[ newFieldName ].data = result[ newFieldName ].data.concat( errors[ fieldName ] );
		} else {
			// redux-form only allows objects or strings as error values, so we nest the array of errors
			// under an arbitrary `data` property.
			result[ newFieldName ] = { data: errors[ fieldName ] };
		}

		return result;
	}, {} );
};

