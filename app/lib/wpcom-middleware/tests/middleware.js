// The tested module:
jest.unmock( '..' );

// Breaks jest for some reason:
//jest.unmock( 'wpcom' ); - replaced by a manual mock
jest.unmock( 'debug' );

import { default as middleware } from '../index';
import { WPCOM_REQUEST } from '../../../reducers/action-types.js';
import WPCOM from 'wpcom';

describe( 'middleware', () => {
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

    describe( 'wpcom request', () => {

        const method = 'post';
        const params = { path: '/users/email' };
        const payload = { email: 'hello@somedomain.com' };
        const LOADING_ACTION = 'LOADING_ACTION';
        const SUCCESS_ACTION = 'SUCCESS_ACTION';
        const FAIL_ACTION = 'FAIL_ACTION';

        it( 'should make proper api request', () => {
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
console.log( WPCOM().req[ method ].calls );
            expect( WPCOM().req[ method ] ).toBeCalledWith( params, {}, payload );

        } );

        pit( 'should dispatch success action', () => {
            const store = {
                getState: jest.genMockFunction().mockReturnValue( {} ),
                dispatch: jest.genMockFunction()
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


            expect( WPCOM().req[ method ] ).toBeCalled();
            expect( store.dispatch ).toBeCalledWith( { type: LOADING_ACTION } );

            return promise.then( () => expect( store.dispatch ).toBeCalledWith( { type: SUCCESS_ACTION } ) );
        } );

        pit( 'should dispatch fail action', () => {
            const store = {
                getState: jest.genMockFunction().mockReturnValue( {} ),
                dispatch: jest.genMockFunction()
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


            expect( WPCOM().req[ method ] ).toBeCalled();
            expect( store.dispatch ).toBeCalledWith( { type: LOADING_ACTION } );

            return promise.then( () => expect( store.dispatch ).toBeCalledWith( { type: FAIL_ACTION } ) );
        } );
    } );
} );
