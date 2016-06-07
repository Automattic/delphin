jest.disableAutomock();

// Internal dependencies
import { camelize, snakeify } from '..';

describe( 'snakeify', () => {
	it( "should convert all of an object's keys to snake_case", () => {
		expect( snakeify( { fooBar: 1, 'bar-baz': 2, foo3: { foo4Bar: true } } ) ).toEqual( {
			foo_bar: 1,
			bar_baz: 2,
			foo_3: {
				foo_4_bar: true
			}
		} );
	} );
} );

describe( 'camelize', () => {
	it( "should convert all of an object's keys to camelCase", () => {
		expect( camelize( { foo_bar: 1, 'bar-baz': 2, foo3: { foo4Bar: true } } ) ).toEqual( {
			fooBar: 1,
			barBaz: 2,
			foo3: {
				foo4Bar: true
			}
		} );
	} );
} );
