jest.disableAutomock();

/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { isConnected } from '../selectors';

describe( 'Domain selectors', () => {
	describe( '#isConnected', () => {
		const createUpdateDomainState = data => deepFreeze( {
			domain: {
				updateDomain: {
					data
				}
			}
		} );

		it( 'should return `false` when there is no data connection', () => {
			const state = createUpdateDomainState( {} );

			expect( isConnected( state ) ).toEqual( false );
		} );

		it( 'should return `true` when there is success message provided', () => {
			const state = createUpdateDomainState( {
				results: {
					success: 'Success'
				}
			} );

			expect( isConnected( state ) ).toEqual( true );
		} );
	} );
} );
