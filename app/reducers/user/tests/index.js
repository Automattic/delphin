jest.disableAutomock();

// Internal dependencies
import {
	CREATE_USER_WITHOUT_PASSWORD,
	CREATE_USER_WITHOUT_PASSWORD_COMPLETE
} from 'reducers/action-types';
import { user, initialState } from '..';

describe( 'state.user', () => {
	it( 'should return the initial state', () => {
		expect( user( undefined, { type: 'RANDOM' } ) ).toEqual( initialState );
	} );

	it( 'should update `email` and `isUpdating` when the user is created', () => {
		expect( user( undefined, {
			type: CREATE_USER_WITHOUT_PASSWORD,
			email: 'foo@bar.com'
		} ) ).toEqual( {
			isUpdating: true,
			wasCreated: false,
			data: { email: 'foo@bar.com' }
		} );
	} );

	it( 'should update `wasCreated` when the user creation completes', () => {
		expect( user( undefined, {
			type: CREATE_USER_WITHOUT_PASSWORD_COMPLETE,
			email: 'foo@bar.com'
		} ) ).toEqual( {
			isUpdating: false,
			wasCreated: true,
			data: { email: 'foo@bar.com' }
		} );
	} );
} );
