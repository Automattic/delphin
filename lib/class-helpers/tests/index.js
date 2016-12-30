jest.disableAutomock();

// Internal dependencies
import { bindHandlers } from '..';

describe( 'bindHandlers', () => {
	function Test( param ) {
		this.param = param;
		bindHandlers( this );
	}

	Test.prototype.handleClick = function() {
		return this.param;
	};

	Test.prototype.someFunc = function() {
		return this.param;
	};

	it( 'should bind functions that start with handle', () => {
		const a = new Test( 'hello' );
		expect( a.handleClick() ).toBe( 'hello' );
	} );

	it( 'should leave alone functions that doesn\'t start with handle', () => {
		const a = new Test( 'hello' );
		expect( a.someFunc === Test.prototype.someFunc ).toBeTruthy();
	} );
} );
