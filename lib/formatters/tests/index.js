jest.disableAutomock();

// Internal dependencies
import { camelizeKeys, snakeifyKeys, preventWidows } from '..';

describe( 'snakeifyKeys', () => {
	it( "should convert all of an object's keys to snake_case", () => {
		expect( snakeifyKeys( {
			fooBar: 1,
			'bar-baz': 2,
			foo3: {
				foo4Bar: true
			},
			fooSix: [
				'helloWorld',
				'foo_bar',
				{ helloWorld: false }
			]
		} ) ).toEqual( {
			foo_bar: 1,
			bar_baz: 2,
			foo_3: {
				foo_4_bar: true
			},
			foo_six: [
				'helloWorld',
				'foo_bar',
				{ hello_world: false }
			]
		} );
	} );
} );

describe( 'camelizeKeys', () => {
	it( "should convert all of an object's keys to camelCase", () => {
		expect( camelizeKeys( {
			foo_bar: 1,
			'bar-baz': 2,
			foo3: { foo4Bar: true },
			foo_six: [
				'helloWorld',
				'foo_bar',
				{ hello_world: false }
			]
		} ) ).toEqual( {
			fooBar: 1,
			barBaz: 2,
			foo3: {
				foo4Bar: true
			},
			fooSix: [
				'helloWorld',
				'foo_bar',
				{ helloWorld: false }
			]
		} );
	} );
} );

// The tests for preventWidows are originally from wp-calypso:
// https://github.com/Automattic/wp-calypso/blob/master/client/lib/formatting/test/index.js#L131
describe( 'preventWidows', () => {
	it( 'should not modify input if type is not string', () => {
		const types = [
			{},
			undefined,
			1,
			true,
			[],
			function() {}
		];

		types.forEach( ( type ) => {
			expect( preventWidows( type ) ).toEqual( type );
		} );
	} );

	it( 'should not change empty string when input is all whitespace', () => {
		const inputs = [
			' ',
			'\t',
			'\n'
		];

		inputs.forEach( ( input ) => {
			expect( preventWidows( input ) ).toEqual( input );
		} );
	} );

	it( 'should return input when only one word', () => {
		expect( preventWidows( 'test' ) ).toEqual( 'test' );
	} );

	it( 'should preserve space on input', () => {
		expect( preventWidows( 'test ' ) ).toEqual( 'test ' );
		expect( preventWidows( '  test' ) ).toEqual( '  test' );
		expect( preventWidows( ' I really love BBQ. It is one of my favorite foods. Beef ribs are amazing.' ) )
			.toEqual( ' I really love BBQ. It is one of my favorite foods. Beef ribs are\xA0amazing.' );

		expect( preventWidows( 'I really love BBQ. It is one of my favorite foods. Beef ribs are amazing. ', 2 ) )
			.toEqual( 'I really love BBQ. It is one of my favorite foods. Beef ribs are\xA0amazing. ' );

	} );

	it( 'should add non-breaking space between words to keep', () => {
		const input = 'I really love BBQ. It is one of my favorite foods. Beef ribs are amazing.';
		expect( preventWidows( input ) ).toEqual(
			'I really love BBQ. It is one of my favorite foods. Beef ribs are\xA0amazing.'
		);

		expect( preventWidows( input, 4 ) ).toEqual(
			'I really love BBQ. It is one of my favorite foods. Beef\xA0ribs\xA0are\xA0amazing.'
		);
	} );

	it( 're-apllying should add non-breaking space if required', () => {
		const input = 'I really love BBQ. It is one of my favorite foods. Beef ribs are amazing.';
		expect( preventWidows( preventWidows( input, 2 ), 4 ) ).toEqual(
			'I really love BBQ. It is one of my favorite foods. Beef\xA0ribs\xA0are\xA0amazing.'
		);
	} );

	it( 're-apllying should remove non-breaking space if required', () => {
		const input = 'I really love BBQ. It is one of my favorite foods. Beef ribs are amazing.';
		expect( preventWidows( preventWidows( input, 3 ), 2 ) ).toEqual(
			'I really love BBQ. It is one of my favorite foods. Beef ribs are\xA0amazing.'
		);
	} );
} );
