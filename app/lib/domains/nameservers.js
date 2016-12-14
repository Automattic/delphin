// External dependencies
import compact from 'lodash/compact';
import { normalizeDomain } from '.';
import parseDomain from 'parse-domain';
import { translate } from 'i18n-calypso';
import values from 'lodash/values';

export const isNameserverValid = value => {
	const { subdomain, domain, tld } = parseDomain( value ) || {};

	return compact( [ subdomain, domain, tld ] ).join( '.' ) === value;
};

export const validateUpdateNameserversForm = fields => {
	const requiredFieldNames = [ 'nameserver1', 'nameserver2' ];
	const fieldNames = [ ...requiredFieldNames, 'nameserver3', 'nameserver4' ];
	const errors = {};

	requiredFieldNames.forEach( fieldName => {
		if ( ! fields[ fieldName ] ) {
			errors[ fieldName ] = translate( 'Field is required.' );
		}
	} );

	fieldNames.forEach( fieldName => {
		if ( errors[ fieldName ] ) {
			return;
		}

		if ( fieldName === 'nameserver3' && ! fields.nameserver3 && ! fields.nameserver4 ) {
			return;
		}

		if ( fieldName === 'nameserver4' && ! fields.nameserver4 ) {
			return;
		}

		if ( ! fields[ fieldName ] || ! isNameserverValid( normalizeDomain( fields[ fieldName ] ) ) ) {
			errors[ fieldName ] = translate( 'Invalid value provided.' );
		} else if ( values( fields ).filter( name => name === fields[ fieldName ] ).length > 1 ) {
			errors[ fieldName ] = translate( 'This is a duplicate field.' );
		}
	} );

	return errors;
};
