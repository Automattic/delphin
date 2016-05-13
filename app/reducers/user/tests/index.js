jest.disableAutomock();

// Internal dependencies
import {
	CONNECT_USER,
	CONNECT_USER_COMPLETE,
	VERIFY_USER,
	VERIFY_USER_COMPLETE
} from 'reducers/action-types';
import { user, initialState } from '..';

describe( 'state.user', () => {
	it( 'should return the initial state', () => {
		expect( user( undefined, { type: 'RANDOM' } ) ).toEqual( initialState );
	} );

	it( 'should update `email` and `isRequesting` when the user is created', () => {
		expect( user( undefined, {
			type: CONNECT_USER,
			email: 'foo@bar.com'
		} ) ).toEqual( {
			intention: null,
			isLoggedIn: false,
			isRequesting: true,
			wasCreated: false,
			data: { bearerToken: null, email: 'foo@bar.com', twoFactorAuthenticationEnabled: null }
		} );
	} );

	it( 'should update `wasCreated` when the user creation completes', () => {
		expect( user( undefined, {
			type: CONNECT_USER_COMPLETE,
			email: 'foo@bar.com',
			twoFactorAuthenticationEnabled: false
		} ) ).toEqual( {
			intention: null,
			isLoggedIn: false,
			isRequesting: false,
			wasCreated: true,
			data: { bearerToken: null, email: 'foo@bar.com', twoFactorAuthenticationEnabled: false }
		} );
	} );

	it( 'should update `isRequesting` when verifying', () => {
		expect( user( undefined, { type: VERIFY_USER } ).isRequesting ).toBe( true );
	} );

	it( 'should update `isRequesting`, `isLoggedIn`, and `bearerToken` when the user is verified', () => {
		const result = user( undefined, { type: VERIFY_USER_COMPLETE, bearerToken: 'foobar' } );

		expect( result.isRequesting ).toBe( false );
		expect( result.isLoggedIn ).toBe( true );
		expect( result.data.bearerToken ).toBe( 'foobar' );
	} );
} );
