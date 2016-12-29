// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import {
	TOGGLE_HIDE,
	TOGGLE_SHOW,
} from 'reducers/action-types';
import toggle from '..';

describe( 'state.ui.toggle reducer', () => {
	it( 'should return an empty object at first', () => {
		expect( toggle( undefined, { type: 'UNRELATED' } ) ).toEqual( {} );
	} );

	it( 'should add a key when showing/hiding', () => {
		expect( toggle( undefined, { type: TOGGLE_HIDE, name: 'foo' } ) ).toEqual( {
			foo: { value: false, persistent: false }
		} );

		expect( toggle( undefined, { type: TOGGLE_SHOW, name: 'bar' } ) ).toEqual( {
			bar: { value: true, persistent: false }
		} );
	} );

	it( 'should update an existing key when showing/hiding', () => {
		expect( toggle( { foo: { value: true, persistent: false } }, { type: TOGGLE_HIDE, name: 'foo' } ) ).toEqual( {
			foo: { value: false, persistent: false }
		} );

		expect( toggle( { bar: { value: false, persistent: false } }, { type: TOGGLE_SHOW, name: 'bar' } ) ).toEqual( {
			bar: { value: true, persistent: false }
		} );
	} );

	it( 'should add a key to an existing object when showing/hiding', () => {
		expect( toggle( { foo: { value: true, persistent: false } }, { type: TOGGLE_HIDE, name: 'bar' } ) ).toEqual( {
			foo: { value: true, persistent: false },
			bar: { value: false, persistent: false },
		} );

		expect( toggle( { foo: { value: false, persistent: false } }, { type: TOGGLE_SHOW, name: 'bar' } ) ).toEqual( {
			foo: { value: false, persistent: false },
			bar: { value: true, persistent: false },
		} );
	} );

	it( 'should reset the toggle when the current page changes', () => {
		expect( toggle( { foo: { value: true, persistent: false } }, { type: LOCATION_CHANGE } ) ).toEqual( {} );
	} );

	it( 'should be possible to persist specific toggles when the location changes', () => {
		const stateWithPersistentToggle = {
			bar: {
				value: true,
				persistent: true
			}
		};

		expect( toggle( undefined, { type: TOGGLE_SHOW, name: 'bar', persistent: true } ) ).toEqual( stateWithPersistentToggle );

		expect( toggle( stateWithPersistentToggle, { type: LOCATION_CHANGE } ) ).toEqual( stateWithPersistentToggle );
	} );
} );
