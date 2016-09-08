jest.disableAutomock();

// Internal dependencies
import { selectedDomain } from '..';
import {
	DOMAIN_SELECT
} from 'reducers/action-types';

describe( 'checkout reducer for select domain action', () => {
	it( 'should return undefined state when provided domain is undefined', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$10.00' } ),
			newState = selectedDomain( originalState, { type: DOMAIN_SELECT } );

		expect( newState ).toBe( undefined );
	} );
} );
