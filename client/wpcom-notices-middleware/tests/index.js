// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	WPCOM_REQUEST_FAIL,
} from 'reducers/action-types';
import { wpcomNoticesMiddleware } from '..';

describe( 'wpcom-notices-middleware', () => {
	it( 'should call next middleware', () => {
		const next = jest.fn();
		const action = { type: 'UNRELATED' };

		wpcomNoticesMiddleware()( next )( action );

		expect( next ).toHaveBeenCalledWith( action );
	} );

	it( 'should add a notice when a `WPCOM_REQUEST_FAIL` action is provided with a non-function `fail` property', () => {
		const next = jest.fn();
		const store = { dispatch: jest.fn() };
		const error = { message: 'foo' };
		const originalAction = { type: 'UNRELATED', fail: { type: 'ALSO_UNRELATED' } };
		const action = { type: WPCOM_REQUEST_FAIL, error, originalAction };

		wpcomNoticesMiddleware( store )( next )( action );

		expect( store.dispatch ).toHaveBeenCalledWith( addNotice( {
			message: error.message,
			status: 'error'
		} ) );
	} );

	it( 'should not add a notice when a `WPCOM_REQUEST_FAIL` action is provided with a function `fail` property', () => {
		const next = jest.fn();
		const store = { dispatch: jest.fn() };
		const error = { message: 'foo' };
		const originalAction = { type: 'UNRELATED', fail: () => {} };
		const action = { type: WPCOM_REQUEST_FAIL, error, originalAction };

		wpcomNoticesMiddleware( store )( next )( action );

		expect( store.dispatch ).toHaveBeenCalledTimes( 0 );
	} );
} );
