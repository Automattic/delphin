jest.disableAutomock();

// Internal dependencies
import {
	CLEAR_USER,
	CONNECT_USER_WITHOUT_PASSWORD,
	CONNECT_USER_WITHOUT_PASSWORD_COMPLETE,
	VERIFY_USER,
	VERIFY_USER_COMPLETE
} from 'reducers/action-types';
import { user, initialState } from '..';

describe( 'state.user', () => {
	it( 'should return the initial state', () => {
		expect( user( undefined, { type: 'RANDOM' } ) ).toEqual( initialState );
	} );

	it( 'should update `email` and `isUpdating` when the user is created', () => {
		expect( user( undefined, {
			type: CONNECT_USER_WITHOUT_PASSWORD,
			email: 'foo@bar.com'
		} ) ).toEqual( {
			isLoggedIn: false,
			isUpdating: true,
			wasCreated: false,
			data: { bearerToken: null, email: 'foo@bar.com', twoFactorAuthenticationEnabled: null }
		} );
	} );

	it( 'should update `wasCreated` when the user creation completes', () => {
		expect( user( undefined, {
			type: CONNECT_USER_WITHOUT_PASSWORD_COMPLETE,
			email: 'foo@bar.com',
			twoFactorAuthenticationEnabled: false
		} ) ).toEqual( {
			isLoggedIn: false,
			isUpdating: false,
			wasCreated: true,
			data: { bearerToken: null, email: 'foo@bar.com', twoFactorAuthenticationEnabled: false }
		} );
	} );

	it( 'should update `isUpdating` when verifying', () => {
		expect( user( undefined, { type: VERIFY_USER } ).isUpdating ).toBe( true );
	} );

	it( 'should update `isUpdating`, `isLoggedIn`, and `bearerToken` when the user is verified', () => {
		const result = user( undefined, { type: VERIFY_USER_COMPLETE, bearerToken: 'foobar' } );

		expect( result.isUpdating ).toBe( false );
		expect( result.isLoggedIn ).toBe( true );
		expect( result.data.bearerToken ).toBe( 'foobar' );
	} );

	it( 'should clear the user when a `CLEAR_USER` action appears', () => {
		expect( user( undefined, { type: CLEAR_USER } ) ).toEqual( initialState );
	} );
} );
