jest.disableAutomock();

// Internal dependencies
import { canConnectToService } from '../index';

describe( 'lib/services', () => {
	it( 'should return `false` when unknown service name is provided', () => {
		const result = canConnectToService( 'unknown' );

		expect( result ).toBe( false );
	} );

	it( 'should return `true` when `wpcom` service name is provided', () => {
		const result = canConnectToService( 'wpcom' );

		expect( result ).toBe( true );
	} );

	it( 'should return `true` when `pressable` service name is provided', () => {
		const result = canConnectToService( 'pressable' );

		expect( result ).toBe( true );
	} );
} );
