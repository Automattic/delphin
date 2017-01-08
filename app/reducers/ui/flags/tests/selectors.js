// Internal dependencies
import { getFlag } from '../selectors';

describe( 'getFlag', () => {
	it( 'should return the value of `state.ui.flags[name]` if it exists', () => {
		expect( getFlag( { ui: { flags: { foo: { value: true, persistent: false } } } }, 'foo' ) ).toEqual( true );
		expect( getFlag( { ui: { flags: { foo: { value: false, persistent: false } } } }, 'foo' ) ).toEqual( false );
	} );

	it( 'should return false if `state.ui.flags[name]` does not exist', () => {
		expect( getFlag( { ui: { flags: {} } }, 'foo' ) ).toEqual( false );
	} );
} );
