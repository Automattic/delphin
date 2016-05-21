// Internal dependencies
import {
	DOMAIN_SEARCH_SUBMIT,
	DOMAIN_SEARCH_INPUT_CHANGE,
	DOMAIN_SEARCH_KEYWORD_REMOVE,
	DOMAIN_SEARCH_KEYWORD_SELECT,
	DOMAIN_SEARCH_KEYWORD_DESELECT,
	DOMAIN_SEARCH_LAST_KEYWORD_REMOVE
} from 'reducers/action-types';
import { domainSearch } from '..';

jest.mock( 'routes' );
jest.unmock( '..' );

describe( 'ui.domainSearch reducer', () => {
	it( 'should have an empty `inputValue` initially', () => {
		expect( domainSearch( undefined, { type: 'NOT_AN_ACTION' } ).inputValue ).toBe( '' );
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
} );
