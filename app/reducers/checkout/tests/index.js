jest.disableAutomock();

// Internal dependencies
import { selectedDomain } from '..';
import {
	DOMAIN_SELECT
} from 'reducers/action-types';

describe( 'checkout reducer for select domain action', () => {
	it( 'should return state with undefined domain when provided domain is undefined', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$10.00' } ),
			newState = selectedDomain( originalState, { type: DOMAIN_SELECT } );

		expect( newState ).toEqual( { domain: undefined } );
	} );

	it( 'should return state with new domain', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$15.00' } ),
			newState = selectedDomain( originalState, { value: { domain_name: 'wordpress.org', cost: '$20.00' }, type: DOMAIN_SELECT } );

		expect( newState ).toEqual( { domain: 'wordpress.org', cost: '$20.00' } );
	} );
} );
