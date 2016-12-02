jest.disableAutomock();

// Internal dependencies
import { getQueryParams, applyQueryStringToFeatures } from '../index';

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

	describe( '#applyQueryStringToFeatures', () => {
		it( 'should return the same features object is no query string is given', () => {
			const features = {
				foo: true,
				hello: 'world'
			};
			const result = applyQueryStringToFeatures( features );

			expect( result ).toEqual( features );
		} );

		it( 'should modify the `features` of `config` using the query string content', () => {
			const config = {
				features: {
					foo: false,
					bar: false,
					baz: true,
				},
				hello: 'world',
				x: 54
			};
			const result = applyQueryStringToFeatures( config.features, '?features.foo&features.bar=true&features.baz=false' );

			expect( result ).toEqual( {
				foo: true,
				bar: true,
				baz: false,
			} );
		} );
	} );
} );
