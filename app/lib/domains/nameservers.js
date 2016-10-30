// External dependencies
import compact from 'lodash/compact';
import parseDomain from 'parse-domain';
import { translate } from 'i18n-calypso';

export const isNameserverValid = value => {
	const { subdomain, domain, tld } = parseDomain( value ) || {};

	return compact( [ subdomain, domain, tld ] ).join( '.' ) === value;
};

export const validateUpdateNameserversForm = values => {
	const requiredFields = [ 'nameserver1', 'nameserver2' ];
	const allFields = [ ...requiredFields, 'nameserver3', 'nameserver4' ];
	const errors = {};

	requiredFields.forEach( fieldName => {
		if ( ! values[ fieldName ] ) {
			errors[ fieldName ] = translate( 'Field is required.' );
		}
	} );

	allFields.forEach( fieldName => {
		if ( errors[ fieldName ] ) {
			return;
		}

		if ( fieldName === 'nameserver3' && ! values.nameserver3 && ! values.nameserver4 ) {
			return;
		}

		if ( fieldName === 'nameserver4' && ! values.nameserver4 ) {
			return;
		}

		if ( ! values[ fieldName ] || ! isNameserverValid( values[ fieldName ] ) ) {
			errors[ fieldName ] = translate( 'Invalid value provided.' );
		}
	} );

	return errors;
};
