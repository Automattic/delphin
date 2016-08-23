jest.disableAutomock();

// Internal dependencies
import { CONFIRM_DOMAIN_MORE_INFORMATION_SHOW } from 'reducers/action-types';
import { moreInformationIsVisible } from '..';

describe( 'state.ui.confirmDomain.moreInformationIsVisible', () => {
	it( 'should not be visible at first', () => {
		expect( moreInformationIsVisible( undefined, { type: 'UNRELATED' } ) ).toBeFalsy();
	} );

	it( 'should be visible after `CONFIRM_DOMAIN_MORE_INFORMATION_SHOW`', () => {
		expect( moreInformationIsVisible( false, { type: CONFIRM_DOMAIN_MORE_INFORMATION_SHOW } ) ).toBeTruthy();
	} );
} );
