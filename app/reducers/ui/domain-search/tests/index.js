// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	DOMAIN_SEARCH_SUBMIT,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_KEYWORD_SELECT,
	DOMAIN_SEARCH_KEYWORD_DESELECT,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE,
	RELATED_WORD_FETCH,
	RELATED_WORD_FETCH_COMPLETE
} from 'reducers/action-types';
import { domainSearch } from '..';

jest.mock( 'routes' );
jest.unmock( '..' );

describe( 'ui.domainSearch reducer', () => {
	it( 'should have an empty `inputValue` initially', () => {
		expect( domainSearch( undefined, { type: 'NOT_AN_ACTION' } ).inputValue ).toBe( '' );
	} );

	it( 'should return initial state when `q` query parameter is undefined', () => {
		expect( domainSearch( undefined, {
			type: LOCATION_CHANGE,
			payload: {
				pathname: '/search',
				query: {}
			}
		} ) ).toEqual( {
			inputValue: '',
			keywords: [],
			showEmptySearchNotice: false
		} );
	} );

	it( 'should change `inputValue` when the input changes', () => {
		expect( domainSearch( undefined, {
			type: DOMAIN_SEARCH_INPUT_CHANGE,
			value: 'foobar'
		} ).inputValue ).toBe( 'foobar' );
	} );

	it( 'should add `inputValue` to `keywords` when `inputValue` ends in a space', () => {
		expect( domainSearch( undefined, {
			type: DOMAIN_SEARCH_INPUT_CHANGE,
			value: 'foobar '
		} ) ).toEqual( {
			inputValue: '',
			keywords: [ { value: 'foobar', isSelected: false } ],
			relatedWords: [],
			showEmptySearchNotice: false
		} );
	} );

	it( 'should add `inputValue` to `keywords` when the form is submitted', () => {
		expect( domainSearch( {
			inputValue: 'foobar',
			keywords: []
		}, {
			type: DOMAIN_SEARCH_SUBMIT
		} ) ).toEqual( {
			inputValue: '',
			keywords: [ { value: 'foobar', isSelected: false } ]
		} );
	} );

	it( 'should be possible to select a keyword', () => {
		const initialState = {
			inputValue: '',
			keywords: [ { value: 'foobar', isSelected: false } ]
		};

		expect( domainSearch( initialState, {
			type: DOMAIN_SEARCH_KEYWORD_SELECT,
			value: 'foobar'
		} ) ).toEqual( {
			inputValue: '',
			keywords: [ { value: 'foobar', isSelected: true } ]
		} );
	} );

	it( 'should be possible to deselect a keyword', () => {
		const initialState = {
			inputValue: '',
			keywords: [ { value: 'foobar', isSelected: true } ]
		};

		expect( domainSearch( initialState, {
			type: DOMAIN_SEARCH_KEYWORD_DESELECT
		} ) ).toEqual( {
			inputValue: '',
			keywords: [ { value: 'foobar', isSelected: false } ]
		} );
	} );

	it( 'should be possible to remove a keyword', () => {
		const initialState = {
			inputValue: 'foobaz',
			keywords: [
				{ value: 'foobar', isSelected: false },
				{ value: 'barbaz', isSelected: false }
			]
		};

		expect( domainSearch( initialState, {
			type: DOMAIN_SEARCH_KEYWORD_REMOVE,
			value: 'foobar'
		} ) ).toEqual( {
			inputValue: 'foobaz',
			keywords: [ { value: 'barbaz', isSelected: false } ]
		} );
	} );

	it( 'should be possible to remove the last keyword', () => {
		const initialState = {
			inputValue: '',
			keywords: [
				{ value: 'foobar', isSelected: false },
				{ value: 'barbaz', isSelected: false }
			]
		};

		expect( domainSearch( initialState, {
			type: DOMAIN_SEARCH_LAST_KEYWORD_REMOVE
		} ) ).toEqual( {
			inputValue: 'barba',
			keywords: [ { value: 'foobar', isSelected: false } ]
		} );
	} );

	describe( 'related words', () => {
		it( 'should be an empty array at first', () => {
			expect( domainSearch( undefined, { type: 'NOT_AN_ACTION' } ).relatedWords ).toEqual( [] );
		} );

		it( 'should add a word when it is fetched', () => {
			expect( domainSearch( undefined, { type: RELATED_WORD_FETCH, word: 'foobar' } ).relatedWords ).toEqual( [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ] );
		} );

		it( 'should not add the same word twice', () => {
			expect( domainSearch( {
				relatedWords: [ {
					word: 'foobar',
					data: null,
					isRequesting: true,
					hasLoadedFromServer: false
				} ]
			}, { type: RELATED_WORD_FETCH, word: 'foobar' } ).relatedWords ).toEqual( [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ] );
		} );

		it( 'should add related words when the request completes', () => {
			const initialState = {
				relatedWords: [ {
					word: 'foobar',
					data: null,
					isRequesting: true,
					hasLoadedFromServer: false
				} ]
			};

			expect( domainSearch( initialState, {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ]
			} ).relatedWords ).toEqual( [ {
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ],
				isRequesting: false,
				hasLoadedFromServer: true
			} ] );
		} );

		it( 'should remove duplicate related words when adding them', () => {
			const initialState = {
				relatedWords: [ {
					word: 'foobar',
					data: null,
					isRequesting: true,
					hasLoadedFromServer: false
				} ]
			};

			expect( domainSearch( initialState, {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: 'foobar',
				data: [ 'foo', 'foo', 'baz' ]
			} ).relatedWords ).toEqual( [ {
				word: 'foobar',
				data: [ 'foo', 'baz' ],
				isRequesting: false,
				hasLoadedFromServer: true
			} ] );
		} );

		it( 'should replace related words if they are already in the store', () => {
			const initialState = {
				relatedWords: [ {
					word: 'foobar',
					data: [ 'foo' ],
					isRequesting: false,
					hasLoadedFromServer: true
				} ]
			};

			expect( domainSearch( initialState, {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ]
			} ).relatedWords ).toEqual( [ {
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ],
				isRequesting: false,
				hasLoadedFromServer: true
			} ] );
		} );
	} );
} );
