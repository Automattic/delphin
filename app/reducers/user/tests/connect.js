jest.disableAutomock();

// Internal dependencies
import {
	CONNECT_USER,
	CONNECT_USER_CLEAR,
	CONNECT_USER_COMPLETE,
	VERIFY_USER,
	VERIFY_USER_COMPLETE
} from 'reducers/action-types';
import { connect } from '../connect';

describe( 'state.user.connect', () => {
	it( 'should update `email` and `isRequesting` when the user is created', () => {
		expect( connect( undefined, {
			type: CONNECT_USER,
			email: 'foo@bar.com'
		} ) ).toEqual( {
			intention: null,
			isRequesting: true,
			wasCreated: false,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				twoFactorAuthenticationEnabled: null
			}
		} );
	} );

	it( 'should update `wasCreated` when the user creation completes', () => {
		expect( connect( undefined, {
			type: CONNECT_USER_COMPLETE,
			email: 'foo@bar.com',
			twoFactorAuthenticationEnabled: false
		} ) ).toEqual( {
			intention: null,
			isRequesting: false,
			wasCreated: true,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				twoFactorAuthenticationEnabled: false
			}
		} );
	} );

	it( 'should reset `wasCreated` when a `CONNECT_USER_CLEAR` action is triggered', () => {
		expect( connect( {
			intention: null,
			isRequesting: false,
			wasCreated: true,
			data: { bearerToken: null, email: 'foo@bar.com', twoFactorAuthenticationEnabled: false }
		}, { type: CONNECT_USER_CLEAR } ) ).toEqual( {
			intention: null,
			isRequesting: false,
			wasCreated: false,
			data: { bearerToken: null, email: 'foo@bar.com', twoFactorAuthenticationEnabled: false }
		} );
	} );

	it( 'should update `isRequesting` when verifying', () => {
		expect( connect( undefined, { type: VERIFY_USER } ).isRequesting ).toBe( true );
	} );

	it( 'should update `isRequesting` and `bearerToken` when the user is verified', () => {
		const result = connect( undefined, { type: VERIFY_USER_COMPLETE, bearerToken: 'foobar' } );

		expect( result.isRequesting ).toBe( false );
		expect( result.data.bearerToken ).toBe( 'foobar' );
	} );
} );
