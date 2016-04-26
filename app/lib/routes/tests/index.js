jest.disableAutomock();

// Internal dependencies
import { getLocaleSlug, stripLocaleSlug } from '..';

describe( 'lib/routes', () => {
	describe( 'getLocaleSlug', () => {
		it( 'should get the locale slug, if present', () => {
			expect( getLocaleSlug( '/fr/foobar' ) ).toBe( 'fr' );
		} );

		it( 'should return undefined if no locale slug is present', () => {
			expect( getLocaleSlug( '/foobar' ) ).toBe( undefined );
		} );

		it( 'should return the locale slug for a URL with only the locale', () => {
			expect( getLocaleSlug( '/fr' ) ).toBe( 'fr' );
		} );
	} );

	describe( 'stripLocaleSlug', () => {
		it( 'should not modify strings that do not begin with a locale slug', () => {
			expect( stripLocaleSlug( '/foobar' ) ).toBe( '/foobar' );
		} );

		it( 'should strip out the locale slug', () => {
			expect( stripLocaleSlug( '/fr/foobar' ) ).toBe( '/foobar' );
		} );

		it( 'should only strip out the first locale slug', () => {
			expect( stripLocaleSlug( '/fr/fr/foobar' ) ).toBe( '/fr/foobar' );
		} );

		it( 'should return root for a URL with only the locale', () => {
			expect( stripLocaleSlug( '/fr' ) ).toBe( '/' );
		} );
	} );
} );
