jest.disableAutomock();

// Internal dependencies
import {
	FETCH_USER,
	FETCH_USER_COMPLETE
} from 'reducers/action-types';
import { settings, initialState } from '../settings';

describe( 'state.user.settings', () => {
	it( 'should update `isRequesting` when the user is fetched', () => {
		expect( settings( undefined, { type: FETCH_USER } ).isRequesting ).toBe( true );
	} );

	it( 'should update multiple user properties when when the user fetching is completed', () => {
		expect( settings( Object.assign( {}, initialState, { isRequesting: true } ), {
			type: FETCH_USER_COMPLETE,
			firstName: 'Foo',
			lastName: 'Bar',
			email: 'foo@bar.com',
			locale: 'fr'
		} ) ).toEqual( {
			hasLoadedFromServer: true,
			isRequesting: false,
			data: {
				firstName: 'Foo',
				lastName: 'Bar',
				email: 'foo@bar.com',
				locale: 'fr'
			}
		} );
	} );
} );
