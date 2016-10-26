// Internal dependencies
import {
	FETCH_USER_COMPLETE,
	LOGOUT_USER
} from 'reducers/action-types';
import { isLoggedIn } from '..';

describe( 'state.user', () => {
	describe( 'isLoggedIn', () => {
		it( 'should return a false `isLoggedIn` at first', () => {
			expect( isLoggedIn( undefined, { type: 'UNRELATED' } ) ).toBe( false );
		} );

		it( 'should return a true `isLoggedIn` after fetching completes', () => {
			expect( isLoggedIn( false, { type: FETCH_USER_COMPLETE } ) ).toBe( true );
		} );

		it( 'should return a false `isLoggedIn` after the user is logged out', () => {
			expect( isLoggedIn( true, { type: LOGOUT_USER } ) ).toBe( false );
		} );
	} );
} );
