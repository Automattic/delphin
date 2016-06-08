jest.disableAutomock();

// Internal dependencies
import { normalizeNameForApi, normalizePayload, normalizeValidationErrors } from '..';

describe( 'normalize functions for contact information', () => {
	describe( 'normalizeNameForApi', () => {
		it( 'should return just a first name if there is no space', () => {
			expect( normalizeNameForApi( 'foo' ).firstName ).toEqual( 'foo' );
			expect( normalizeNameForApi( 'foo' ).lastName ).toBeFalsy();
		} );

		it( 'should use the first space as the split point between first/last names', () => {
			expect( normalizeNameForApi( 'Foo van Bar III' ).firstName ).toEqual( 'Foo' );
			expect( normalizeNameForApi( 'Foo van Bar III' ).lastName ).toEqual( 'van Bar III' );
		} );
	} );

	describe( 'normalizePayload', () => {
		it( 'should extract `name` into `firstName` and `lastName` and snakeify keys', () => {
			expect( normalizePayload( [ 'foo.com' ], {
				name: 'Foo Bar',
				address1: '123 Baz St.'
			} ) ).toEqual( {
				domain_names: [ 'foo.com' ],
				contact_information: {
					first_name: 'Foo',
					last_name: 'Bar',
					address_1: '123 Baz St.'
				}
			} );
		} );
	} );

	describe( 'normalizeValidationErrors', () => {
		it( 'should combine `first_name` and `last_name` errors into a single `name` property', () => {
			expect( normalizeValidationErrors( {
				first_name: [ 'foo' ],
				last_name: [ 'bar' ]
			} ) ).toEqual( { name: { data: [ 'foo', 'bar' ] } } );
		} );

		it( 'should camel case field names', () => {
			expect( normalizeValidationErrors( {
				address_1: [ 'required' ]
			} ) ).toEqual( {
				address1: { data: [ 'required' ] }
			} );
		} );
	} );
} );
