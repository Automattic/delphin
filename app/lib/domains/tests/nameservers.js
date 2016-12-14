jest.disableAutomock();

// Internal dependencies
import {
	validateUpdateNameserversForm
} from '../nameservers';

describe( 'lib/domain/nameservers', () => {
	describe( '#validateUpdateNameserversForm', () => {
		it( 'should return errors for required fields when there are no required nameservers provided', () => {
			const nameservers = {
				nameserver1: '',
				nameserver2: '',
				nameserver3: '',
				nameserver4: '',
			};

			const result = validateUpdateNameserversForm( nameservers );

			expect( result ).toEqual( {
				nameserver1: 'Field is required.',
				nameserver2: 'Field is required.',
			} );
		} );

		it( 'should return object with errors when there are invalid nameservers provided', () => {
			const nameservers = {
				nameserver1: 'unknown nameserver',
				nameserver2: 'does-not-make-sense',
				nameserver3: '-------------------',
				nameserver4: '123.456.789',
			};

			const result = validateUpdateNameserversForm( nameservers );

			expect( result ).toEqual( {
				nameserver1: 'Invalid value provided.',
				nameserver2: 'Invalid value provided.',
				nameserver3: 'Invalid value provided.',
				nameserver4: 'Invalid value provided.',
			} );
		} );

		it( 'should return object with first errors when there are no/invalid nameservers provided', () => {
			const nameservers = {
				nameserver1: '',
				nameserver2: 'does-not-make-sense',
				nameserver3: '',
				nameserver4: '123.456.789',
			};

			const result = validateUpdateNameserversForm( nameservers );

			expect( result ).toEqual( {
				nameserver1: 'Field is required.',
				nameserver2: 'Invalid value provided.',
				nameserver3: 'Invalid value provided.',
				nameserver4: 'Invalid value provided.',
			} );
		} );

		it( 'should return empty object when there are valid nameservers provided', () => {
			const nameservers = {
				nameserver1: 'ns1.example.com',
				nameserver2: 'ns2.example.com.',
				nameserver3: 'NS3.EXAMPLE.COM',
				nameserver4: '  ns4.example.com.  ',
			};

			const result = validateUpdateNameserversForm( nameservers );

			expect( result ).toEqual( {} );
		} );

		it( 'should return object with errors for duplicate nameservers', () => {
			const nameservers = {
				nameserver1: 'ns1.example.com',
				nameserver2: 'ns1.example.com',
				nameserver3: 'ns2.example.com',
				nameserver4: 'ns2.example.com',
			};

			const result = validateUpdateNameserversForm( nameservers );

			expect( result ).toEqual( {
				nameserver1: 'This is a duplicate field.',
				nameserver2: 'This is a duplicate field.',
				nameserver3: 'This is a duplicate field.',
				nameserver4: 'This is a duplicate field.',
			} );
		} );
	} );
} );
