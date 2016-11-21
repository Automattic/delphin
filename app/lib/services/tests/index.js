// Internal dependencies
import {
	canConnectToService,
	isConnectedWithNameservers,
	isManagedByConcierge
} from '../index';

describe( 'lib/services', () => {
	describe( 'canConnectToService', () => {
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

	describe( '#isConnectedWithNameservers', () => {
		it( 'should return false when invalid service name is provided', () => {
			const result = isConnectedWithNameservers( 'sawbuck' );

			expect( result ).toBe( false );
		} );

		it( 'should return true when `custom` service name is provided', () => {
			const result = isConnectedWithNameservers( 'custom' );

			expect( result ).toBe( true );
		} );
	} );

	describe( '#isManagedByConcierge', () => {
		it( 'should return false when invalid service name is provided', () => {
			const result = isManagedByConcierge( 'sawbuck' );

			expect( result ).toBe( false );
		} );

		it( 'should return true when `concierge` service name is provided', () => {
			const result = isManagedByConcierge( 'concierge' );

			expect( result ).toBe( true );
		} );
	} );
} );
