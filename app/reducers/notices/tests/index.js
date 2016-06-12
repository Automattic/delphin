// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	NOTICE_ADD,
	NOTICE_REMOVE
} from 'reducers/action-types';
import { notices } from '..';

jest.unmock( '..' );
jest.unmock( 'lodash/uniqueId' );

describe( 'notices reducer for location change action', () => {
	it( 'should clear all notices', () => {
		const originalState = Object.freeze( [ {
				id: '1',
				message: 'An error message',
				status: 'error'
			}, {
				id: '2',
				message: 'Another error message',
				status: 'error'
			} ] ),
			newState = notices( originalState, { type: LOCATION_CHANGE } );

		expect( newState ).toEqual( [] );
	} );
} );

describe( 'notices reducer for notice add action', () => {
	it( 'should add a notice', () => {
		const originalState = Object.freeze( [] ),
			notice = {
				message: 'An error message',
				status: 'error'
			},
			newState = notices( originalState, { notice, type: NOTICE_ADD } );

		expect( newState ).toEqual( [
			{
				id: '1',
				message: 'An error message',
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

