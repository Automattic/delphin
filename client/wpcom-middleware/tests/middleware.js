jest.mock( 'wpcom-xhr-request' );
jest.mock( 'client/bearer-cookie', () => ( {
	getTokenFromBearerCookie: () => {}
} ) );

global.localStorage = {
	getItem: () => null
};

import i18n from 'i18n-calypso';
import middleware from '..';
import { NOTICE_ADD, WPCOM_REQUEST } from 'reducers/action-types.js';
import handler from 'wpcom-xhr-request';

describe( 'wpcom-middleware', () => {
	describe( 'unrelated action', () => {
		it( 'should call next middleware', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} )
			};

			const next = jasmine.createSpy( 'next' );
			middleware( store )( next )( { type: 'TEST_ACTION' } );

			expect( next.calls.count() ).toEqual( 1 );
		} );

		it( 'should not call action creators', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} )
			};

			const actionCreator = jasmine.createSpy( 'actionCreator' );
			middleware( store )( () => {} )( {
				type: 'TEST_ACTION',
				loading: actionCreator,
				success: actionCreator,
				fail: actionCreator
			} );

			expect( actionCreator.calls.count() ).toEqual( 0 );
		} );
	} );

	describe( 'wpcom request action', () => {
		const method = 'post';
		const params = { path: '/users/email' };
		const payload = { email: 'hello@somedomain.com' };
		const LOADING_ACTION = 'LOADING_ACTION';
		const SUCCESS_ACTION = 'SUCCESS_ACTION';
		const FAIL_ACTION = 'FAIL_ACTION';

		afterEach( () => {
			handler.mockClear();
		} );

		it( 'should make proper api request with the default locale', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction()
			};

			middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method,
				params,
				payload,
				loading: LOADING_ACTION,
				success: SUCCESS_ACTION,
				fail: FAIL_ACTION
			} );

			expect( handler.mock.calls[ 0 ][ 0 ].query ).toEqual( { locale: 'en' } );
		} );

		it( 'should make a request with the locale when it changes in the `i18n` module', () => {
			i18n.setLocale( {
				'': { localeSlug: 'fr' }
			} );

			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction()
			};

			middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method,
				params,
				payload,
				loading: LOADING_ACTION,
				success: SUCCESS_ACTION,
				fail: FAIL_ACTION
			} );

			expect( handler.mock.calls[ 0 ][ 0 ].query ).toEqual( { locale: 'fr' } );
		} );

		it( 'should make a request with the key/value in the `delphin:checkout` property of `localStorage` to checkout endpoints if it is set', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction()
			};

			const paramsForCheckout = Object.assign( {}, { path: '/me/paygate-configuration' } );

			global.localStorage = {
				getItem: () => 'some_key:some_value'
			};

			middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method,
				params: paramsForCheckout,
				payload,
				loading: LOADING_ACTION,
				success: SUCCESS_ACTION,
				fail: FAIL_ACTION
			} );

			expect( handler.mock.calls[ 0 ][ 0 ].query ).toEqual( { locale: 'fr', some_key: 'some_value' } );
		} );

		it( 'should make a request with the `_locale` property if using the v2 API namespace', () => {
			i18n.setLocale( {
				'': { localeSlug: 'ja' }
			} );

			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction()
			};

			const paramsWithNamespace = Object.assign( {}, params, { apiNamespace: 'wpcom/v2' } );

			middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method,
				params: paramsWithNamespace,
				payload,
				loading: LOADING_ACTION,
				success: SUCCESS_ACTION,
				fail: FAIL_ACTION
			} );

			expect( handler.mock.calls[ 0 ][ 0 ].query ).toEqual( { _locale: 'ja' } );
		} );

		pit( 'should dispatch success action', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => typeof action === 'function' ? action( store.dispatch ) : action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method,
				params,
				payload,
				loading: LOADING_ACTION,
				success: SUCCESS_ACTION,
				fail: FAIL_ACTION
			} );

			expect( handler ).toBeCalled();
			expect( store.dispatch ).lastCalledWith( { type: LOADING_ACTION } );

			return promise.then( () => expect( store.dispatch ).lastCalledWith( { type: SUCCESS_ACTION } ) );
		} );

		pit( 'should dispatch fail action', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => typeof action === 'function' ? action( store.dispatch ) : action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method: 'put', // hardcoded to fail in the mock
				params,
				payload,
				loading: LOADING_ACTION,
				success: SUCCESS_ACTION,
				fail: FAIL_ACTION
			} );

			expect( handler ).toBeCalled();
			expect( store.dispatch ).lastCalledWith( { type: LOADING_ACTION } );

			return promise.catch( () => expect( store.dispatch ).lastCalledWith( { type: FAIL_ACTION } ) );
		} );

		pit( 'should propagate result of inner action dispatch on success', () => {
			const dummyAction = { type: 'DUMMY' };
			const dummyActionResult = { result: 'Hurray!' };
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => {
					if ( action && action.type === dummyAction.type ) {
						return Promise.resolve( dummyActionResult );
					}
				} )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method: 'get',
				params,
				payload,
				loading: LOADING_ACTION,
				success: () => dummyAction,
				fail: FAIL_ACTION
			} );

			return promise.then( res => expect( res ).toEqual( dummyActionResult ) );
		} );

		pit( 'should propagate result of inner action dispatch on failure', () => {
			const dummyAction = { type: 'DUMMY' };
			const dummyActionResult = { result: 'Hurray!' };
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => {
					if ( action && action.type === dummyAction.type ) {
						return Promise.resolve( dummyActionResult );
					}
				} )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method: 'put', // hardcoded to fail in the mock
				params,
				payload,
				loading: LOADING_ACTION,
				success: SUCCESS_ACTION,
				fail: () => dummyAction
			} );

			return promise.then( res => expect( res ).toEqual( dummyActionResult ) );
		} );

		pit( 'should propagate whatever success action creator returns', () => {
			const dummyValue = 42;

			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method,
				params,
				payload,
				loading: LOADING_ACTION,
				success: () => dummyValue,
				fail: FAIL_ACTION
			} );

			return promise.then( res => expect( res ).toEqual( dummyValue ) );
		} );

		pit( 'should propagate whatever fail action creator returns', () => {
			const dummyValue = 42;

			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method: 'put', // hardcoded to fail in the mock
				params,
				payload,
				loading: LOADING_ACTION,
				fail: () => dummyValue,
				success: FAIL_ACTION
			} );

			return promise.then( res => expect( res ).toEqual( dummyValue ) );
		} );

		pit( 'default action creator just passes through the success result', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => typeof action === 'function' ? action( store.dispatch ) : action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method,
				params,
				payload
			} );

			expect( handler ).toBeCalled();

			// the result is camelCase although mocked WPCOM returns snake_case, this is intentional
			return promise.then( res => expect( res ).toEqual( { greatSuccess: true } ) );
		} );

		pit( 'default action creator just passes through the error object', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => typeof action === 'function' ? action( store.dispatch ) : action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method: 'put', // hardcoded to fail in the mock
				params,
				payload
			} );

			expect( handler ).toBeCalled();

			return promise.then( result => {
				throw new Error( 'We expected a rejected promise, but got a successful one: ' + result );
			}, result => {
				expect( result instanceof Error ).toBeTruthy();
			} );
		} );

		pit( 'should not swallow errors by default for string actions', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => typeof action === 'function' ? action() : action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method: 'put', // hardcoded to fail in the mock
				fail: 'THIS_ACTION_FAILED',
				params,
				payload
			} );

			expect( handler ).toBeCalled();
			return promise.then( result => {
				throw new Error( 'We expected a rejected promise, but got a successful one: ' + result );
			}, result => {
				expect( result instanceof Error ).toBeTruthy();
			} );
		} );

		pit( 'should not swallow errors by default for object actions', () => {
			const store = {
				getState: jest.genMockFunction().mockReturnValue( {} ),
				dispatch: jest.genMockFunction().mockImplementation( action => typeof action === 'function' ? action() : action )
			};

			const promise = middleware( store )( () => {} )( {
				type: WPCOM_REQUEST,
				method: 'put', // hardcoded to fail in the mock
				fail: { type: 'THIS_ACTION_FAILED' },
				params,
				payload
			} );

			expect( handler ).toBeCalled();

			return promise.then( result => {
				throw new Error( 'We expected a rejected promise, but got a successful one: ' + result );
			}, result => {
				expect( result instanceof Error ).toBeTruthy();
			} );
		} );
	} );
} );
