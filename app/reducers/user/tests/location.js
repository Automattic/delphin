jest.disableAutomock();

// Internal dependencies
import {
	USER_LOCATION_FETCH,
	USER_LOCATION_FETCH_COMPLETE
} from 'reducers/action-types';
import { location, initialState } from '../location';

describe( 'state.user.location', () => {
	it( 'should return the initial state for unrelated actions', () => {
		expect( location( undefined, { type: 'UNRELATED' } ) ).toEqual( initialState );
	} );

	it( 'should update `isRequesting` when fetching', () => {
		expect( location( undefined, { type: USER_LOCATION_FETCH } ).isRequesting ).toBe( true );
	} );

	it( 'should update `isRequesting`, `hasLoadedFromServer`, and the country when it is fetched', () => {
		expect( location( {
			hasLoadedFromServer: false,
			isRequesting: true,
			data: null
		}, {
			type: USER_LOCATION_FETCH_COMPLETE,
			countryCode: 'ES'
		} ) ).toEqual( {
			hasLoadedFromServer: true,
			isRequesting: false,
			data: { countryCode: 'ES' }
		} );
	} );
} );
