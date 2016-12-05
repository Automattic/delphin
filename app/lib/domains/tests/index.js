// Internal dependencies
import {
	extractHostName,
	isDomain,
	isDomainSearch,
	isValidSecondLevelDomain,
	secondLevelDomainOf,
	omitTld,
	queryIsInResults,
	withTld,
	validateDomain
} from '..';

describe( 'lib/domains', () => {
	describe( 'isDomain', () => {
		it( 'should match valid domain', () => {
			expect( isDomain( 'hello.com' ) ).toBe( true );
			expect( isDomain( 'hello-world.com' ) ).toBe( true );
			expect( isDomain( 'hell-o.com' ) ).toBe( true );
		} );

		it( 'should not match invalid domain', () => {
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

		it( 'should not match invalid second-level domains', () => {
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
				{ domainName: 'foo.com' },
				{ domainName: 'baz.com' }
			], 'foo.com' ) ).toBe( true );
		} );

		it( 'should return true if the query is a second level domain that exists in the given results', () => {
			expect( queryIsInResults( [
				{ domainName: 'foo.com' },
				{ domainName: 'baz.com' }
			], 'foo' ) ).toBe( true );
		} );

		it( 'should return true if the query is not in the given results', () => {
			expect( queryIsInResults( [
				{ domainName: 'foo.com' },
				{ domainName: 'baz.com' }
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
		it( 'should return true for valid .blog domains', () => {
			expect( isDomainSearch( 'foo.blog' ) ).toBe( true );
			expect( isDomainSearch( 'foo-bar.blog' ) ).toBe( true );
			expect( isDomainSearch( 'foo0.blog' ) ).toBe( true );
		} );

		it( 'should return false for invalid .blog domains', () => {
			expect( isDomainSearch( 'foo-.blog' ) ).toBe( false );
			expect( isDomainSearch( 'foo bar.blog' ) ).toBe( false );
		} );

		it( 'should return false for non-.blog domains', () => {
			expect( isDomainSearch( 'foo.com' ) ).toBe( false );
		} );

		it( 'should return false for strings without a TLD suffix', () => {
			expect( isDomainSearch( 'foo' ) ).toBe( false );
		} );
	} );

	describe( 'validateDomain', () => {
		it( 'should return an error if the query is undefined', () => {
			expect( validateDomain( undefined ) ).not.toBeNull();
		} );

		it( 'should return an error if the query is empty', () => {
			expect( validateDomain( '' ) ).not.toBeNull();
			expect( validateDomain( '   ' ) ).not.toBeNull();
		} );

		it( 'should return an error if the query is less than four characters', () => {
			expect( validateDomain( 'foo' ) ).not.toBeNull();
		} );

		it( 'should return an error if the query is longer than 63 characterso ', () => {
			expect( validateDomain( new Array( 65 ).join( 'a' ) ) ).not.toBeNull();
		} );

		it( 'should return an error if the query begins with a hyphen', () => {
			expect( validateDomain( '-foobar' ) ).not.toBeNull();
		} );

		it( 'should return an error if the query ends with a hyphen', () => {
			expect( validateDomain( 'foobar-' ) ).not.toBeNull();
		} );

		it( 'should return an error if the query contains a period', () => {
			expect( validateDomain( 'foo.bar' ) ).not.toBeNull();
		} );

		it( 'should return an error if the query is not a valid domain', () => {
			// `isDomain` is tested and covers this
			expect( validateDomain( 'foo$bar' ) ).not.toBeNull();
		} );

		it( 'should return an error if a reserved domain is submitted', () => {
			expect( validateDomain( 'design' ) ).not.toBeNull();
		} );

		it( 'should return an empty object if a valid query is submitted', () => {
			expect( validateDomain( 'thisisavalidquery' ) ).toBeNull();
		} );
	} );

	describe( 'withTld', () => {
		it( 'should add the given TLD to the end of the given string', () => {
			expect( withTld( 'foo', 'blog' ) ).toBe( 'foo.blog' );
		} );

		it( 'should replace an existing TLD with the given one', () => {
			expect( withTld( 'foo.com', 'blog' ) ).toBe( 'foo.blog' );
		} );
	} );

	describe( 'extractHostName', () => {
		it( 'should return a host name for a valid url', () => {
			expect( extractHostName( 'hello.com' ) ).toBe( 'hello.com' );
			expect( extractHostName( '  hello.com  ' ) ).toBe( 'hello.com' );
			expect( extractHostName( 'hello.com/blah_blah' ) ).toBe( 'hello.com' );
			expect( extractHostName( 'http://hello-world.com' ) ).toBe( 'hello-world.com' );
			expect( extractHostName( 'https://hello.world.com' ) ).toBe( 'hello.world.com' );
			expect( extractHostName( 'http://foo.co/blah_blah' ) ).toBe( 'foo.co' );
			expect( extractHostName( 'http://foo.co/blah_blah.' ) ).toBe( 'foo.co' );
			expect( extractHostName( 'http://foo.co/blah_blah,' ) ).toBe( 'foo.co' );
			expect( extractHostName( '(http://foo.co/blah_blah)' ) ).toBe( 'foo.co' );
			expect( extractHostName( 'http:\\\\foo.co\\blah_blah' ) ).toBe( 'foo.co' );
			expect( extractHostName( 'foo.co\\\\blah_blah' ) ).toBe( 'foo.co' );
		} );

		it( 'should return null for an invalid url', () => {
			expect( extractHostName( 'helloworld' ) ).toBe( null );
			expect( extractHostName( '.com' ) ).toBe( null );
			expect( extractHostName( 'hello.whatever' ) ).toBe( null );
		} );
	} );
} );
