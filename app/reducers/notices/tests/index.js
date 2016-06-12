// Internal dependencies
import {
	NOTICE_ADD,
	NOTICE_REMOVE
} from 'reducers/action-types';
import { notices } from '..';

jest.unmock( '..' );
jest.unmock( 'lodash/uniqueId' );

describe( 'notices reducer for notice add action', () => {
	it( 'should add a notice', () => {
		const originalState = Object.freeze( [] ),
			notice = {
				message: 'A error message',
				status: 'error'
			},
			newState = notices( originalState, { notice, type: NOTICE_ADD } );

		expect( newState ).toEqual( [
			{
				id: '1',
				message: 'A error message',
				status: 'error'
			}
		] );
	} );
} );

describe( 'notices reducer for notice remove action', () => {
	it( 'should remove a notice', () => {
		const originalState = Object.freeze( [ {
				id: '1',
				message: 'An error message',
				status: 'error'
			}, {
				id: '2',
				message: 'Another error message',
				status: 'error'
			} ] ),
			notice = {
				id: '1'
			},
			newState = notices( originalState, { notice, type: NOTICE_REMOVE } );

		expect( newState ).toEqual( [
			{
				id: '2',
				message: 'Another error message',
				status: 'error'
			}
		] );
	} );
} );

