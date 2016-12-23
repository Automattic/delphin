// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	DOMAIN_SEARCH_CLEAR,
	DOMAIN_SEARCH_SUBMIT,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
} from 'reducers/action-types';
import domainKeywords from '../domain-keywords';

jest.mock( 'routes' );

describe( 'ui.domainSearch reducer', () => {
	it( 'should have an empty `inputValue` initially', () => {
		expect( domainKeywords( undefined, { type: 'NOT_AN_ACTION' } ).inputValue ).toBe( '' );
	} );

	it( 'should return initial state when `q` query parameter is undefined', () => {
		expect( domainKeywords( undefined, {
			type: LOCATION_CHANGE,
			payload: {
				pathname: '/search',
				query: {}
			}
		} ) ).toEqual( {
			inputValue: '',
			keywords: []
		} );
	} );

	it( 'should change `inputValue` when the input changes', () => {
		expect( domainKeywords( undefined, {
			type: DOMAIN_SEARCH_INPUT_CHANGE,
			value: 'foobar'
		} ).inputValue ).toBe( 'foobar' );
	} );

	it( 'should add `inputValue` to `keywords` when `inputValue` ends in a space', () => {
		expect( domainKeywords( undefined, {
			type: DOMAIN_SEARCH_INPUT_CHANGE,
			value: 'foobar '
		} ) ).toEqual( {
			inputValue: '',
			keywords: [ { value: 'foobar', id: 1 } ]
		} );
	} );

	it( 'should add `inputValue` to `keywords` when the form is submitted', () => {
		expect( domainKeywords( {
			inputValue: 'foobar',
			keywords: []
		}, {
			type: DOMAIN_SEARCH_SUBMIT
		} ) ).toEqual( {
			inputValue: '',
			keywords: [ { value: 'foobar', id: 2 } ]
		} );
	} );

	it( 'should be possible to remove a keyword', () => {
		const initialState = {
			inputValue: 'foobaz',
			keywords: [
				{ value: 'foobar', id: 0 },
				{ value: 'barbaz', id: 1 }
			]
		};

		expect( domainKeywords( initialState, {
			type: DOMAIN_SEARCH_KEYWORD_REMOVE,
			keyword: { value: 'barbaz', id: 1 }
		} ) ).toEqual( {
			inputValue: 'foobaz',
			keywords: [ { value: 'foobar', id: 0 } ]
		} );
	} );

	it( 'should be possible to remove a keyword when multiple keywords have the same value', () => {
		const initialState = {
			inputValue: '',
			keywords: [
				{ value: 'barbaz', id: 0 },
				{ value: 'foobar', id: 1 },
				{ value: 'foobar', id: 2 },
				{ value: 'foobar', id: 3 },
				{ value: 'foofoo', id: 4 }
			]
		};

		expect( domainKeywords( initialState, {
			type: DOMAIN_SEARCH_KEYWORD_REMOVE,
			keyword: { value: 'foobar', id: 2 }
		} ) ).toEqual( {
			inputValue: '',
			keywords: [
				{ value: 'barbaz', id: 0 },
				{ value: 'foobar', id: 1 },
				{ value: 'foobar', id: 3 },
				{ value: 'foofoo', id: 4 }
			]
		} );
	} );

	it( 'should be possible to remove the last keyword', () => {
		const initialState = {
			inputValue: '',
			keywords: [
				{ value: 'foobar', id: 0 },
				{ value: 'barbaz', id: 1 }
			]
		};

		expect( domainKeywords( initialState, {
			type: DOMAIN_SEARCH_LAST_KEYWORD_REMOVE
		} ) ).toEqual( {
			inputValue: 'barba',
			keywords: [ { value: 'foobar', id: 0 } ]
		} );
	} );

	it( 'should not change list of keywords when removing the last keyword', () => {
		const initialState = {
			inputValue: '',
			keywords: []
		};

		expect( domainKeywords( initialState, {
			type: DOMAIN_SEARCH_LAST_KEYWORD_REMOVE
		} ) ).toEqual( {
			inputValue: '',
			keywords: []
		} );
	} );

	it( 'should be possible to clear all keywords', () => {
		const initialState = {
			inputValue: '',
			keywords: [
				{ value: 'foobar', id: 0 },
				{ value: 'barbaz', id: 1 }
			]
		};

		expect( domainKeywords( initialState, {
			type: DOMAIN_SEARCH_CLEAR
		} ) ).toEqual( {
			inputValue: '',
			keywords: []
		} );
	} );
} );
