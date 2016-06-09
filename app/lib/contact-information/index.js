// Internal dependencies
import { camelizeKeys, snakeifyKeys } from 'lib/formatters';

/**
 * Resolves discrepencies between mismatched key names for contact information between Delphin and the API.
 * Currently, this means camelCasing each key name, and combining `firstName` and `lastName` into a single
 * `name` property.
 *
 * @param {object} errors - Map of fields:error to normalize.
 * @return {object} - New map of errors.
 */
export const normalizeValidationErrors = errors => {
	errors = camelizeKeys( errors );

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

/**
 * Expands the given name string into a first and last name, by using everything before the first space
 * as the first name, and everything after the first space as the last name.
 *
 * @param {string} name - String representing a name
 * @return {object} - Map of `firstName`, `lastName` to strings.
 */
export const normalizeNameForApi = ( name = '' ) => {
	const result = {},
		spaceIndex = name.indexOf( ' ' );

	if ( spaceIndex === -1 ) {
		result.firstName = name;
	} else {
		Object.assign( result, {
			// everything before the first space is the first name
			firstName: name.substring( 0, spaceIndex ),
			// everything after the last space is the last name
			lastName: name.substring( spaceIndex + 1 )
		} );
	}

	return result;
};

/**
 * Resolves discrepencies between mismatched key names for the contact information validation payload.
 * Currently, this means snake_casing each key name, and expanding `name` into `firstName` and `lastName`
 * properties in the contact information.
 *
 * @param {array} domainNames - List of domain names.
 * @param {object} contactInformation - Map of fields:values representing contact information.
 * @return {object} - Payload to request to the API.
 */
export const normalizePayload = ( domainNames, contactInformation ) => {
	const normalizedContactInformation = Object.keys( contactInformation ).reduce( ( result, fieldName ) => {
		if ( fieldName === 'name' && contactInformation.name ) {
			return Object.assign( result, normalizeNameForApi( contactInformation.name ) );
		}

		return Object.assign( result, { [ fieldName ]: contactInformation[ fieldName ] } );
	}, {} );

	return snakeifyKeys( { domainNames, contactInformation: normalizedContactInformation } );
};
