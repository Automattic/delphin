jest.disableAutomock();

// Internal dependencies
import { getQueryParams, applyQueryStringToConfig } from '../index';

describe( 'lib/config', () => {
	describe( '#getQueryParams', () => {
		it( 'should return an empty object if no parameter is given', () => {
			const result = getQueryParams();

			expect( result ).toEqual( {} );
		} );

		it( 'should return an empty object if an empty string is given', () => {
			const result = getQueryParams( '' );

			expect( result ).toEqual( {} );
		} );

		it( 'should return an empty object if `?` is given', () => {
			const result = getQueryParams( '?' );

			expect( result ).toEqual( {} );
		} );

		it( 'should parse a query string into an object', () => {
			const result = getQueryParams( '?hello=world&foo&bar=false&x=54' );

			expect( result ).toEqual( {
				bar: 'false',
				foo: true,
				hello: 'world',
				x: '54'
			} );
		} );
	} );

	describe( '#applyQueryStringToConfig', () => {
		it( 'should return the same config object is no query string is given', () => {
			const config = {
				foo: true,
				hello: 'world'
			};
			const result = applyQueryStringToConfig( config );

			expect( result ).toEqual( config );
		} );

		it( 'should modify the config using the query string content', () => {
			const config = {
				foo: false,
				hello: 'world',
				x: 54
			};
			const result = applyQueryStringToConfig( config, '?foo=baz&x=56' );

			expect( result ).toEqual( {
				foo: 'baz',
				hello: 'world',
				x: 56
			} );
		} );
	} );
} );
