jest.disableAutomock();

// Internal dependencies
import { getToggle } from '../selectors';

describe( 'getToggle', () => {
	it( 'should return the value of `state.ui.toggle[name]` if it exists', () => {
		expect( getToggle( { ui: { toggle: { foo: true } } }, 'foo' ) ).toEqual( true );
		expect( getToggle( { ui: { toggle: { foo: false } } }, 'foo' ) ).toEqual( false );
	} );

	it( 'should return false if `state.ui.toggle[name]` does not exist', () => {
		expect( getToggle( { ui: { toggle: {} } }, 'foo' ) ).toEqual( false );
	} );
} );
