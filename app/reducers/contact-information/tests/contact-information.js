jest.disableAutomock();

// Internal dependencies
import {
	CONTACT_INFORMATION_FETCH,
	CONTACT_INFORMATION_FETCH_COMPLETE,
	LOGOUT_USER
} from 'reducers/action-types';
import { contactInformation, initialState } from '..';

describe( 'state.user.contactInformation reducer', () => {
	it( 'should return its initial state when an unrelated action is dispatched', () => {
		expect( contactInformation( undefined, { type: 'UNRELATED' } ) ).toEqual( initialState );
	} );

	it( 'should update `isRequesting` when the fetch action is called', () => {
		expect( contactInformation( undefined, { type: CONTACT_INFORMATION_FETCH } ).isRequesting ).toBe( true );
	} );

	it( 'should update `hasLoadedFromServer`, `isRequesting`, and save arbitrary data when the fetch is complete', () => {
		expect( contactInformation( {
			isRequesting: true,
			hasLoadedFromServer: false,
			data: null
		}, {
			type: CONTACT_INFORMATION_FETCH_COMPLETE,
			data: {
				name: 'Foo Bar',
				address: '1 Foo St.'
			}
		} ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: true,
			data: {
				name: 'Foo Bar',
				address: '1 Foo St.'
			}
		} );
	} );

	it( 'should return the initial state after the user is logged out', () => {
		expect( contactInformation( {
			isRequesting: false,
			hasLoadedFromServer: true,
			data: { firstName: 'Foo' }
		}, {
			type: LOGOUT_USER
		} ) ).toEqual( initialState );
	} );
} );
