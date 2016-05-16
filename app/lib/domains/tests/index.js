jest.disableAutomock();

// Internal dependencies
import { isDomainName } from '..';

describe( 'lib/domains', () => {
	describe( 'isDomainName', () => {
		it( 'should match valid domain names', () => {
			expect( isDomainName( 'hello.world' ) ).toBe( true );
			expect( isDomainName( 'hello-world.com' ) ).toBe( true );
			expect( isDomainName( 'hell-o.com' ) ).toBe( true );
			expect( isDomainName( 'hello-.com' ) ).toBe( true ); // should not be allowed
			expect( isDomainName( 'h.ello' ) ).toBe( true );
		} );

		it( 'should not match unvalid domain names', () => {
			expect( isDomainName( 'helloworld' ) ).toBe( false );
			expect( isDomainName( 'hello_world.com' ) ).toBe( false );
			expect( isDomainName( '/hello-world.com' ) ).toBe( false );
			expect( isDomainName( '.com' ) ).toBe( false );
			expect( isDomainName( 'hello.world.com' ) ).toBe( false );
			expect( isDomainName( '.world.com' ) ).toBe( false );
			expect( isDomainName( '-hello.com' ) ).toBe( false );
			expect( isDomainName( 'hello.w' ) ).toBe( false );
		} );
	} );
} );
