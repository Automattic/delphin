jest.disableAutomock();

// Internal dependencies
import { isDomain, isValidSecondLevelDomain } from '..';

describe( 'lib/domains', () => {
	describe( 'isDomainName', () => {
		it( 'should match valid domain', () => {
			expect( isDomain( 'hello.world' ) ).toBe( true );
			expect( isDomain( 'hello-world.com' ) ).toBe( true );
			expect( isDomain( 'hell-o.com' ) ).toBe( true );
		} );

		it( 'should not match unvalid domain', () => {
			expect( isDomain( 'helloworld' ) ).toBe( false );
			expect( isDomain( 'hello_world.com' ) ).toBe( false );
			expect( isDomain( '/hello-world.com' ) ).toBe( false );
			expect( isDomain( '.com' ) ).toBe( false );
			expect( isDomain( 'hello.world.com' ) ).toBe( false );
			expect( isDomain( '.world.com' ) ).toBe( false );
			expect( isDomain( '-hello.com' ) ).toBe( false );
			expect( isDomain( 'hello-.com' ) ).toBe( false );
			expect( isDomain( 'hello.w' ) ).toBe( false ); // 1-letter tlds not allowed
			expect( isDomain( 'h.ello' ) ).toBe( false ); // 1-letter slds not allowed
		} );
	} );
	describe( 'isSecondLevelDomain', () => {
		it( 'should match valid second-level domains', () => {
			expect( isValidSecondLevelDomain( 'hello' ) ).toBe( true );
			expect( isValidSecondLevelDomain( 'hello-world' ) ).toBe( true );
			expect( isValidSecondLevelDomain( 'hell-o' ) ).toBe( true );
			expect( isValidSecondLevelDomain( '0hell-o' ) ).toBe( true );
			expect( isValidSecondLevelDomain( 'hello1' ) ).toBe( true );
		} );

		it( 'should not match unvalid second-level domains', () => {
			expect( isValidSecondLevelDomain( 'hello.world' ) ).toBe( false );
			expect( isValidSecondLevelDomain( 'hello_world' ) ).toBe( false );
			expect( isValidSecondLevelDomain( '/hello-world' ) ).toBe( false );
			expect( isValidSecondLevelDomain( '.hello' ) ).toBe( false );
			expect( isValidSecondLevelDomain( '-hello' ) ).toBe( false );
			expect( isValidSecondLevelDomain( 'hello-' ) ).toBe( false );
			expect( isValidSecondLevelDomain( 'h' ) ).toBe( false );
		} );
	} );
} );
