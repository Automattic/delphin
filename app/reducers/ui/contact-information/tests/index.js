// Internal dependencies
import {
	CONTACT_INFORMATION_ADDRESS2_INPUT_SHOW,
	CONTACT_INFORMATION_INPUT_VISIBILITY_RESET,
	CONTACT_INFORMATION_ORGANIZATION_INPUT_SHOW
} from 'reducers/action-types';
import { inputVisibility, inputVisibilityInitialState } from '..';

describe( 'state.ui.contactInformation', () => {
	describe( 'inputVisibility', () => {
		it( 'should return the initial state for unrelated actions', () => {
			expect( inputVisibility( undefined, { type: 'UNRELATED' } ) ).toEqual( inputVisibilityInitialState );
		} );

		it( 'should update `address2` and `organization` input visibility', () => {
			expect( inputVisibility( undefined, { type: CONTACT_INFORMATION_ADDRESS2_INPUT_SHOW } ).address2InputIsVisible ).toBe( true );
			expect( inputVisibility( undefined, { type: CONTACT_INFORMATION_ORGANIZATION_INPUT_SHOW } ).organizationInputIsVisible ).toBe( true );
		} );

		it( 'should return the initial state when the input visibility is reset', () => {
			expect( inputVisibility( {
				address2InputIsVisible: true,
				organizationInputIsVisible: true
			}, { type: CONTACT_INFORMATION_INPUT_VISIBILITY_RESET } ) ).toEqual( inputVisibilityInitialState );
		} );
	} );
} );
