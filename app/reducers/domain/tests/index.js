jest.disableAutomock();

// Internal dependencies
import { updateDomain } from '..';

describe( 'state.domain.updateDomain', () => {
	it( 'should return original state when action type is not supported', () => {
		const originalState = Object.freeze( {
			hasLoadedFromServer: false,
			isRequesting: false
		} );

		expect( updateDomain( originalState, { type: 'ORDER_CHEESE_BURGER' } ) ).toEqual( originalState );
	} );
} );
