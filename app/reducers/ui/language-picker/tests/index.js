jest.disableAutomock();

// Internal dependencies
import {
	LANGUAGE_PICKER_SELECT_HIDE,
	LANGUAGE_PICKER_SELECT_SHOW
} from 'reducers/action-types';
import { isSelectVisible } from '..';

describe( 'state.languagePicker', () => {
	describe( 'isSelectVisible', () => {
		it( 'should return false at first', () => {
			expect( isSelectVisible( undefined, { type: 'UNRELATED' } ) ).toBeFalsy();
		} );

		it( 'should return true after `LANGUAGE_PICKER_SELECT_SHOW`', () => {
			expect( isSelectVisible( true, { type: LANGUAGE_PICKER_SELECT_SHOW } ) ).toBeFalsy();
		} );

		it( 'should return false after `LANGUAGE_PICKER_SELECT_HIDE`', () => {
			expect( isSelectVisible( false, { type: LANGUAGE_PICKER_SELECT_HIDE } ) ).toBeFalsy();
		} );
	} );
} );
