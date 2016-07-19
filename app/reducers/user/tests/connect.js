jest.disableAutomock();

// Internal dependencies
import {
	CONNECT_USER,
	CONNECT_USER_CLEAR,
	CONNECT_USER_COMPLETE,
	CONNECT_USER_WARNING,
	VERIFY_USER,
	VERIFY_USER_COMPLETE,
	VERIFY_USER_FAIL
} from 'reducers/action-types';
import { connect } from '../connect';

describe( 'state.user.connect', () => {
	it( 'should update `email`, `intention`, `notice` and `isRequesting` when a `CONNECT_USER` action is triggered', () => {
		expect( connect( undefined, {
			type: CONNECT_USER,
			email: 'foo@bar.com',
			intention: 'login'
		} ) ).toEqual( {
			intention: 'login',
			isRequesting: true,
			wasCreated: false,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				notice: null,
				twoFactorAuthenticationEnabled: null
			}
		} );
	} );

	it( 'should update `notice` and `intention` when a `CONNECT_USER_WARNING` action is triggered', () => {
		expect( connect( {
			intention: 'signup',
			isRequesting: true,
			wasCreated: false,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				notice: 'Some random error happened',
				twoFactorAuthenticationEnabled: false
			}
		}, {
			type: CONNECT_USER_WARNING,
			notice: 'There is already an account using this email address',
			intention: 'login'
		} ) ).toEqual( {
			intention: 'login',
			isRequesting: true,
			wasCreated: false,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				notice: 'There is already an account using this email address',
				twoFactorAuthenticationEnabled: false
			}
		} );
	} );

	it( 'should update `wasCreated` and `data` when a `CONNECT_USER_COMPLETE` action is triggered', () => {
		expect( connect( {
			intention: 'login',
			isRequesting: true,
			wasCreated: false,
			data: {
				bearerToken: null,
				email: null,
				notice: null,
				twoFactorAuthenticationEnabled: null
			}
		}, {
			type: CONNECT_USER_COMPLETE,
			email: 'foo@bar.com',
			twoFactorAuthenticationEnabled: true
		} ) ).toEqual( {
			intention: 'login',
			isRequesting: false,
			wasCreated: true,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				notice: null,
				twoFactorAuthenticationEnabled: true
			}
		} );
	} );

	it( 'should update `intention` if present in `CONNECT_USER_COMPLETE` action', () => {
		expect( connect( {
			intention: null,
			isRequesting: true,
			wasCreated: false,
			data: {
				bearerToken: null,
				email: null,
				notice: null,
				twoFactorAuthenticationEnabled: null
			}
		}, {
			type: CONNECT_USER_COMPLETE,
			email: 'foo@bar.com',
			twoFactorAuthenticationEnabled: true,
			intention: 'login'
		} ) ).toEqual( {
			intention: 'login',
			isRequesting: false,
			wasCreated: true,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				notice: null,
				twoFactorAuthenticationEnabled: true
			}
		} );
	} );

	it( 'should reset `wasCreated` when a `CONNECT_USER_CLEAR` action is triggered', () => {
		expect( connect( {
			intention: null,
			isRequesting: false,
			wasCreated: true,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				notice: 'Some random error happened',
				twoFactorAuthenticationEnabled: false
			}
		}, { type: CONNECT_USER_CLEAR } ) ).toEqual( {
			intention: null,
			isRequesting: false,
			wasCreated: false,
			data: {
				bearerToken: null,
				email: 'foo@bar.com',
				notice: 'Some random error happened',
				twoFactorAuthenticationEnabled: false
			}
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

	it( 'should update `isRequesting` if the user verification fails', () => {
		expect( connect( {
			intention: null,
			isRequesting: true,
			wasCreated: false,
			data: null
		}, {
			type: VERIFY_USER_FAIL
		} ).isRequesting ).toEqual( false );
	} );
} );
