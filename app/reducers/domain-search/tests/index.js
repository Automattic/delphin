// Internal dependencies
import {
	DOMAIN_SUGGESTIONS_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETED
} from 'reducers/action-types';
import { domainSearch } from '..';

jest.unmock( '..' );

describe( 'domain search reducer', () => {
	it( 'should throw an error when state and action are undefined', () => {
		expect( domainSearch ).toThrowError( TypeError );
	} );

	it( 'should throw an error when action is undefined', () => {
		expect( () => {
			return domainSearch( {} );
		} ).toThrowError( TypeError );
	} );

	it( 'should return initial state when state is undefined and action is empty', () => {
		expect( domainSearch( undefined, {} ) ).toEqual( {
			hasSearched: false,
			isFetching: false,
			results: null
		} );
	} );

	it( 'should return original state when action is empty', () => {
		const originalState = Object.freeze( {
				hasSearched: false,
				isFetching: false,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, {} );

		expect( newState ).toEqual( originalState );
	} );

	it( 'should return original state when action type is not supported', () => {
		const originalState = Object.freeze( {
				hasSearched: false,
				isFetching: false,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, { type: 'ORDER_CHEESE_BURGER' } );

		expect( newState ).toEqual( originalState );
	} );
} );

describe( 'domain search reducer for domain suggestions clear action', () => {
	it( 'should return initial state when state is undefined', () => {
		const newState = domainSearch( undefined, {
			type: DOMAIN_SUGGESTIONS_CLEAR
		} );

		expect( newState ).toEqual( {
			hasSearched: false,
			isFetching: false,
			results: null
		} );
	} );

	it( 'should return initial state', () => {
		const originalState = Object.freeze( {
				hasSearched: false,
				isFetching: true,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, {
				type: DOMAIN_SUGGESTIONS_CLEAR
			} );

		expect( newState ).toEqual( {
			hasSearched: false,
			isFetching: false,
			results: null
		} );
	} );
} );

describe( 'domain search reducer for domain suggestions fetch action', () => {
	it( 'should return initial state with fetching enabled when state is undefined', () => {
		const newState = domainSearch( undefined, { type: DOMAIN_SUGGESTIONS_FETCH, query: 'foobar' } );

		expect( newState ).toEqual( {
			hasSearched: true,
			isFetching: true,
			results: null
		} );
	} );

	it( 'should return original state with fetching enabled', () => {
		const originalState = Object.freeze( {
				hasSearched: false,
				isFetching: false,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, { type: DOMAIN_SUGGESTIONS_FETCH, query: 'foobar' } );

		expect( newState ).toEqual( {
			hasSearched: true,
			isFetching: true,
			results: [ 'example1.com', 'example2.com' ]
		} );
	} );

	it( 'should not update `isUpdating` for an empty query', () => {
		const originalState = Object.freeze( {
				hasSearched: false,
				isFetching: false,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, { type: DOMAIN_SUGGESTIONS_FETCH, query: '' } );

		expect( newState ).toEqual( {
			hasSearched: true,
			isFetching: false,
			results: [ 'example1.com', 'example2.com' ]
		} );
	} );
} );

describe( 'domain search reducer for domain suggestions fetch completed action', () => {
	it( 'should return initial state with fetching disabled when state is undefined', () => {
		const newState = domainSearch( undefined, {
			results: [ 'example.com' ],
			type: DOMAIN_SUGGESTIONS_FETCH_COMPLETED
		} );

		expect( newState ).toEqual( {
			hasSearched: false,
			isFetching: false,
			results: null
		} );
	} );

	it( 'should return original state with fetching disabled', () => {
		const originalState = Object.freeze( {
				hasSearched: false,
				isFetching: true,
				results: [ 'example1.com', 'example2.com' ]
			} ),
			newState = domainSearch( originalState, {
				results: [ 'example3.com' ],
				type: DOMAIN_SUGGESTIONS_FETCH_COMPLETED
			} );

		expect( newState ).toEqual( {
			hasSearched: false,
			isFetching: false,
			results: [ 'example3.com' ]
		} );
	} );
} );
