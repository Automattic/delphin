jest.disableAutomock();

// Internal dependencies
import { initialState, createRequestReducer } from '..';

const FETCH = 'FETCH';
const FETCH_COMPLETE = 'FETCH_COMPLETE';
const FETCH_FAIL = 'FETCH_FAIL';
const EXTRA_ACTION = 'EXTRA_ACTION';

describe( 'createRequestReducer', () => {
	describe( 'with all parameters', () => {
		const reducer = createRequestReducer( {
			loading: FETCH,
			success: FETCH_COMPLETE,
			fail: FETCH_FAIL
		}, ( state, action ) => {
			const { type } = action;

			switch ( type ) {
				case EXTRA_ACTION:
					return Object.assign( {}, state, { prop: 'extra action' } );

				default:
					return state;
			}
		} );

		it( 'should return the initial state for unrelated actions', () => {
			expect( reducer( undefined, { type: 'UNRELATED' } ) ).toEqual( initialState );
		} );

		it( 'should update `isRequesting` when fetching', () => {
			expect( reducer( undefined, { type: FETCH } ).isRequesting ).toBe( true );
		} );

		it( 'should update `isRequesting`, `hasLoadedFromServer`, and `data` when fetching completes', () => {
			expect( reducer( {
				isRequesting: true,
				hasLoadedFromServer: false,
				data: null,
				error: null
			}, {
				type: FETCH_COMPLETE,
				foo: 'bar'
			} ) ).toEqual( {
				hasLoadedFromServer: true,
				isRequesting: false,
				data: { foo: 'bar' },
				error: null
			} );
		} );

		it( 'should camelCase the keys of the provided data  when fetching completes', () => {
			expect( reducer( {
				isRequesting: true,
				hasLoadedFromServer: false,
				data: null,
				error: null
			}, {
				type: FETCH_COMPLETE,
				foo_bar: [ { bar_baz: 'snake_case' } ]
			} ).data ).toEqual( { fooBar: [ { barBaz: 'snake_case' } ] } );
		} );

		it( 'should update `isRequesting` and `error` when fetching fails', () => {
			expect( reducer( {
				hasLoadedFromServer: false,
				isRequesting: true,
				data: null,
				error: null
			}, {
				type: FETCH_FAIL,
				error: { message: 'foobar' }
			} ) ).toEqual( {
				hasLoadedFromServer: false,
				isRequesting: false,
				data: null,
				error: { message: 'foobar' }
			} );
		} );

		it( 'should use actions from an additional reducer, if included', () => {
			expect( reducer( undefined, { type: EXTRA_ACTION } ).prop ).toEqual( 'extra action' );
		} );
	} );

	describe( 'without any parameters', () => {
		it( 'should always just return the given or initial state', () => {
			const blankReducer = createRequestReducer();

			expect( blankReducer( undefined, { type: 'UNRELATED' } ) ).toEqual( initialState );
			expect( blankReducer( { initial: 'cool' }, { type: 'UNRELATED' } ) ).toEqual( {
				initial: 'cool'
			} );
		} );
	} );
} );
