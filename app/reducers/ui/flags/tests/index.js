// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	FLAG_DISABLE,
	FLAG_ENABLE,
} from 'reducers/action-types';
import flags from '..';

describe( 'state.ui.flags reducer', () => {
	it( 'should return an empty object at first', () => {
		expect( flags( undefined, { type: 'UNRELATED' } ) ).toEqual( {} );
	} );

	it( 'should add a key when enabling/disabling', () => {
		expect( flags( undefined, { type: FLAG_DISABLE, name: 'foo' } ) ).toEqual( {
			foo: { value: false, persistent: false }
		} );

		expect( flags( undefined, { type: FLAG_ENABLE, name: 'bar' } ) ).toEqual( {
			bar: { value: true, persistent: false }
		} );
	} );

	it( 'should update an existing key when enabling/disabling', () => {
		expect( flags( { foo: { value: true, persistent: false } }, { type: FLAG_DISABLE, name: 'foo' } ) ).toEqual( {
			foo: { value: false, persistent: false }
		} );

		expect( flags( { bar: { value: false, persistent: false } }, { type: FLAG_ENABLE, name: 'bar' } ) ).toEqual( {
			bar: { value: true, persistent: false }
		} );
	} );

	it( 'should add a key to an existing object when enabling/disabling', () => {
		expect( flags( { foo: { value: true, persistent: false } }, { type: FLAG_DISABLE, name: 'bar' } ) ).toEqual( {
			foo: { value: true, persistent: false },
			bar: { value: false, persistent: false },
		} );

		expect( flags( { foo: { value: false, persistent: false } }, { type: FLAG_ENABLE, name: 'bar' } ) ).toEqual( {
			foo: { value: false, persistent: false },
			bar: { value: true, persistent: false },
		} );
	} );

	it( 'should reset the flags when the current page changes', () => {
		expect( flags( { foo: { value: true, persistent: false } }, { type: LOCATION_CHANGE } ) ).toEqual( {} );
	} );

	it( 'should be possible to persist specific flags when the location changes', () => {
		const stateWithPersistentFlag = {
			bar: {
				value: true,
				persistent: true
			}
		};

		expect( flags( undefined, { type: FLAG_ENABLE, name: 'bar', persistent: true } ) ).toEqual( stateWithPersistentFlag );

		expect( flags( stateWithPersistentFlag, { type: LOCATION_CHANGE } ) ).toEqual( stateWithPersistentFlag );
	} );
} );
