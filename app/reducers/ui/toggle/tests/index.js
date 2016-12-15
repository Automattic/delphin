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
		expect( toggle( undefined, { type: TOGGLE_HIDE, name: 'foo' } ) ).toEqual( { foo: false } );
		expect( toggle( undefined, { type: TOGGLE_SHOW, name: 'bar' } ) ).toEqual( { bar: true } );
	} );

	it( 'should update an existing key when showing/hiding', () => {
		expect( toggle( { foo: true }, { type: TOGGLE_HIDE, name: 'foo' } ) ).toEqual( { foo: false } );
		expect( toggle( { bar: false }, { type: TOGGLE_SHOW, name: 'bar' } ) ).toEqual( { bar: true } );
	} );

	it( 'should add a key to an existing object when showing/hiding', () => {
		expect( toggle( { foo: true }, { type: TOGGLE_HIDE, name: 'bar' } ) ).toEqual( {
			foo: true,
			bar: false,
		} );

		expect( toggle( { foo: false }, { type: TOGGLE_SHOW, name: 'bar' } ) ).toEqual( {
			foo: false,
			bar: true,
		} );
	} );

	it( 'should reset the toggle when the current page changes', () => {
		expect( toggle( { foo: true }, { type: LOCATION_CHANGE } ) ).toEqual( {} );
	} );
} );
