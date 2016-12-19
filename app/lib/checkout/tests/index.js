// Internal dependencies
import { normalizeContactInformation } from '..';

describe( 'normalizeContactInformation', () => {
	it( 'should uppercase the given postal code', () => {
		expect( normalizeContactInformation( {
			postalCode: 'foo'
		} ) ).toEqual( {
			postalCode: 'FOO'
		} );
	} );

	it( 'should not change other properties', () => {
		expect( normalizeContactInformation( {
			foo: 'baz',
			bar: 'foo',
			postalCode: 'whatever'
		} ) ).toEqual( {
			foo: 'baz',
			bar: 'foo',
			postalCode: 'WHATEVER'
		} );
	} );
} );
