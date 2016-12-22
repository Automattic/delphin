// Internal dependencies
import {
	DOMAIN_SEARCH_CLEAR,
	DOMAIN_SUGGESTIONS_FETCH,
	DOMAIN_SUGGESTIONS_FETCH_COMPLETE
} from 'reducers/action-types';
import { domainSearch } from '..';

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
			hasLoadedFromServer: false,
			isRequesting: false,
			results: null,
			query: null
		} );
	} );

	it( 'should return original state when action is empty', () => {
		const originalState = Object.freeze( {
				hasLoadedFromServer: false,
				isRequesting: false,
				results: [ 'example1.com', 'example2.com' ],
				query: 'example'
			} ),
			newState = domainSearch( originalState, {} );

		expect( newState ).toEqual( originalState );
	} );

	it( 'should return original state when action type is not supported', () => {
		const originalState = Object.freeze( {
				hasLoadedFromServer: false,
				isRequesting: false,
				results: [ 'example1.com', 'example2.com' ],
				query: 'example'
			} ),
			newState = domainSearch( originalState, { type: 'ORDER_CHEESE_BURGER' } );

		expect( newState ).toEqual( originalState );
	} );
} );

describe( 'domain search reducer for domain search clear action', () => {
	it( 'should return initial state when state is undefined', () => {
		const newState = domainSearch( undefined, {
			type: DOMAIN_SEARCH_CLEAR
		} );

		expect( newState ).toEqual( {
			hasLoadedFromServer: false,
			isRequesting: false,
			results: null,
			query: null
		} );
	} );

	it( 'should return initial state', () => {
		const originalState = Object.freeze( {
				hasLoadedFromServer: false,
				isRequesting: true,
				results: [ 'example1.com', 'example2.com' ],
				query: 'example'
			} ),
			newState = domainSearch( originalState, {
				type: DOMAIN_SEARCH_CLEAR
			} );

		expect( newState ).toEqual( {
			hasLoadedFromServer: false,
			isRequesting: false,
			results: null,
			query: null
		} );
	} );
} );

describe( 'domain search reducer for domain suggestions fetch action', () => {
	it( 'should return initial state with fetching enabled when state is undefined', () => {
		const newState = domainSearch( undefined, {
			type: DOMAIN_SUGGESTIONS_FETCH,
			query: 'foobar'
		} );

		expect( newState ).toEqual( {
			hasLoadedFromServer: false,
			isRequesting: true,
			results: null,
			query: 'foobar'
		} );
	} );

	it( 'should clear the results when fetching', () => {
		const originalState = Object.freeze( {
				isRequesting: false,
				results: [ 'example1.com', 'example2.com' ],
				query: 'example'
			} ),
			newState = domainSearch( originalState, {
				type: DOMAIN_SUGGESTIONS_FETCH,
				query: 'foobar'
			} );

		expect( newState ).toEqual( {
			hasLoadedFromServer: false,
			isRequesting: true,
			results: null,
			query: 'foobar'
		} );
	} );
} );

describe( 'domain search reducer for domain suggestions fetch completed action', () => {
	it( 'should return initial state with fetching disabled when the given query matches state.query', () => {
		const newState = domainSearch( {
			results: null,
			hasLoadedFromServer: false,
			isRequesting: true,
			query: 'example'
		}, {
			results: [ 'example.com' ],
			type: DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
			query: 'example'
		} );

		expect( newState ).toEqual( {
			hasLoadedFromServer: true,
			isRequesting: false,
			results: [ 'example.com' ],
			query: 'example'
		} );
	} );

	it( 'should return original state when the given query does not match state.query', () => {
		const originalState = Object.freeze( {
				hasLoadedFromServer: false,
				isRequesting: true,
				results: [ 'example1.com', 'example2.com' ],
				query: 'example'
			} ),
			newState = domainSearch( originalState, {
				results: [ 'foobar.com' ],
				type: DOMAIN_SUGGESTIONS_FETCH_COMPLETE,
				query: 'foobar'
			} );

		expect( newState ).toEqual( originalState );
	} );
} );
