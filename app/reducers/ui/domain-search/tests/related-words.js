// Internal dependencies
import {
	RELATED_WORD_FETCH,
	RELATED_WORD_FETCH_COMPLETE,
	RELATED_WORD_FETCH_FAIL,
} from 'reducers/action-types';
import relatedWords from '../related-words';

jest.mock( 'routes' );
jest.unmock( '../related-words' );

describe( 'related-words reducer', () => {
	describe( 'related words', () => {
		it( 'should be an empty array at first', () => {
			expect( relatedWords( undefined, { type: 'NOT_AN_ACTION' } ) ).toEqual( [] );
		} );

		it( 'should add a word when it is fetched', () => {
			expect( relatedWords( undefined, { type: RELATED_WORD_FETCH, word: 'foobar' } ) ).toEqual( [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ] );
		} );

		it( 'should not add the same word twice', () => {
			expect( relatedWords( [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ], { type: RELATED_WORD_FETCH, word: 'foobar' } ) ).toEqual( [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ] );
		} );

		it( 'should add related words when the request completes', () => {
			const initialState = [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ];

			expect( relatedWords( initialState, {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ]
			} ) ).toEqual( [ {
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ],
				isRequesting: false,
				hasLoadedFromServer: true
			} ] );
		} );

		it( 'should remove duplicate related words when adding them', () => {
			const initialState = [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ];

			expect( relatedWords( initialState, {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: 'foobar',
				data: [ 'foo', 'foo', 'baz' ]
			} ) ).toEqual( [ {
				word: 'foobar',
				data: [ 'foo', 'baz' ],
				isRequesting: false,
				hasLoadedFromServer: true
			} ] );
		} );

		it( 'should replace related words if they are already in the store', () => {
			const initialState = [ {
				word: 'foobar',
				data: [ 'foo' ],
				isRequesting: false,
				hasLoadedFromServer: true
			} ];

			expect( relatedWords( initialState, {
				type: RELATED_WORD_FETCH_COMPLETE,
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ]
			} ) ).toEqual( [ {
				word: 'foobar',
				data: [ 'foo', 'bar', 'baz' ],
				isRequesting: false,
				hasLoadedFromServer: true
			} ] );
		} );

		it( 'should replace related words if they are already in the store', () => {
			const initialState = [ {
				word: 'foobar',
				data: null,
				isRequesting: true,
				hasLoadedFromServer: false
			} ];

			expect( relatedWords( initialState, {
				type: RELATED_WORD_FETCH_FAIL,
				word: 'foobar',
			} ) ).toEqual( [ {
				word: 'foobar',
				data: null,
				isRequesting: false,
				hasLoadedFromServer: false
			} ] );
		} );
	} );
} );
