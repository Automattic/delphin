jest.disableAutomock();

// Internal dependencies
import { isDomain, isDomainSearch, isValidSecondLevelDomain, secondLevelDomainOf, omitTld, queryIsInResults } from '..';

describe( 'lib/domains', () => {
	describe( 'isDomain', () => {
		it( 'should match valid domain', () => {
			expect( isDomain( 'hello.com' ) ).toBe( true );
			expect( isDomain( 'hello-world.com' ) ).toBe( true );
			expect( isDomain( 'hell-o.com' ) ).toBe( true );
		} );

		it( 'should not match unvalid domain', () => {
			expect( isDomain() ).toBe( false ); // needs a parameter
			expect( isDomain( null ) ).toBe( false ); // needs a string parameter
			expect( isDomain( 'helloworld' ) ).toBe( false ); // needs a tld
			expect( isDomain( '.com' ) ).toBe( false ); // needs an sld
			expect( isDomain( 'hello_world.com' ) ).toBe( false ); // underscores not allowed
			expect( isDomain( '/hello-world.com' ) ).toBe( false ); // slashes not allowed
			expect( isDomain( 'hello.world.com' ) ).toBe( false ); // has a subdomain
			expect( isDomain( '.world.com' ) ).toBe( false ); // can't start with a dot
			expect( isDomain( '-hello.com' ) ).toBe( false ); // can't start with a dash
			expect( isDomain( 'hello-.com' ) ).toBe( false ); // can't end with a dash
			expect( isDomain( 'hello.w' ) ).toBe( false ); // invalid tld not allowed
			expect( isDomain( 'h.ello' ) ).toBe( false ); // 1-letter sld not allowed
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

	describe( 'secondLevelDomainOf', () => {
		it( 'should extract the SLD from domain names', () => {
			expect( secondLevelDomainOf( 'hello.com' ) ).toBe( 'hello' );
			expect( secondLevelDomainOf( 'hello-world.com' ) ).toBe( 'hello-world' );
			expect( secondLevelDomainOf( 'hell-o.com' ) ).toBe( 'hell-o' );
			expect( secondLevelDomainOf( 'helloworld' ) ).toBe( '' );
			expect( secondLevelDomainOf( 'hello_world.com' ) ).toBe( 'hello_world' );
			expect( secondLevelDomainOf( '.com' ) ).toBe( '' );
		} );
	} );

	describe( 'queryIsInResults', () => {
		it( 'should return true if the query is a domain that exists in the given results', () => {
			expect( queryIsInResults( [
				{ domain_name: 'foo.com' },
				{ domain_name: 'baz.com' }
			], 'foo.com' ) ).toBe( true );
		} );

		it( 'should return true if the query is a second level domain that exists in the given results', () => {
			expect( queryIsInResults( [
				{ domain_name: 'foo.com' },
				{ domain_name: 'baz.com' }
			], 'foo' ) ).toBe( true );
		} );

		it( 'should return true if the query is not in the given results', () => {
			expect( queryIsInResults( [
				{ domain_name: 'foo.com' },
				{ domain_name: 'baz.com' }
			], 'not' ) ).toBe( false );
		} );
	} );

	describe( 'omitTld', () => {
		it( 'should return an empty string if no string is given', () => {
			expect( omitTld() ).toEqual( '' );
		} );

		it( 'should not change strings without a TLD', () => {
			expect( omitTld( 'foobar' ) ).toBe( 'foobar' );
			expect( omitTld( '!@#!@$@!#!@$' ) ).toBe( '!@#!@$@!#!@$' );
		} );

		it( 'should remove all characters including and after the first period', () => {
			expect( omitTld( 'foo.com' ) ).toBe( 'foo' );
			expect( omitTld( 'foo.thisisalongtld' ) ).toBe( 'foo' );
			expect( omitTld( 'baz.' ) ).toBe( 'baz' );
			expect( omitTld( 'foo.co.uk' ) ).toBe( 'foo' );
		} );
	} );

	describe( 'isDomainSearch', () => {
		it( 'should return true for valid .live domains', () => {
			expect( isDomainSearch( 'foo.live' ) ).toBe( true );
			expect( isDomainSearch( 'foo-bar.live' ) ).toBe( true );
			expect( isDomainSearch( 'foo0.live' ) ).toBe( true );
		} );

		it( 'should return false for invalid .live domains', () => {
			expect( isDomainSearch( 'foo-.live' ) ).toBe( false );
			expect( isDomainSearch( 'foo bar.live' ) ).toBe( false );
		} );

		it( 'should return false for non-.live domains', () => {
			expect( isDomainSearch( 'foo.com' ) ).toBe( false );
		} );

		it( 'should return false for strings without a TLD suffix', () => {
			expect( isDomainSearch( 'foo' ) ).toBe( false );
		} );
	} );
} );
