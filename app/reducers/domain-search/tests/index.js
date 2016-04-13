import { domainSearch } from '..';

jest.unmock( '..' );

describe( 'domain search reducer', () => {
	it( 'should throw an error when state and action are undefined', () => {
		expect( domainSearch ).toThrowError( TypeError );
	} );

	it( 'should throw an error when action is undefined', () => {
		expect( () => {
			return domainSearch( {} )
		} ).toThrowError( TypeError );
	} );

	it( 'should return initial state when state is undefined and action is empty', () => {
		expect( domainSearch( undefined, {} ) ).toEqual( {
			isFetching: false,
			results: null
		} );
	} );

	it( 'should return original state when action is empty', () => {
		const originalState = Object.freeze( {
				isFetching: false,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, {} );

		expect( newState ).toEqual( originalState );
	} );

	it( 'should return original state when action type is not supported', () => {
		const originalState = Object.freeze( {
				isFetching: false,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, { type: 'ORDER_CHEESE_BURGER' } );

		expect( newState ).toEqual( originalState );
	} )
} );

describe( 'domain search reducer for domain search fetch action', () => {
	it( 'should return initial state with fetching enabled when state is undefined', () => {
		const newState = domainSearch( undefined, { type: 'DOMAIN_SEARCH_FETCH' } );

		expect( newState ).toEqual( {
			isFetching: true,
			results: null
		} );
	} );

	it( 'should return original state with fetching enabled', () => {
		const originalState = Object.freeze( {
				isFetching: false,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, { type: 'DOMAIN_SEARCH_FETCH' } );

		expect( newState ).toEqual( {
			isFetching: true,
			results: [ 'example1.com', 'example2.com' ]
		} );
	} );
} );

