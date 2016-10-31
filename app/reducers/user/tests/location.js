// Internal dependencies
import {
	USER_LOCATION_FETCH,
	USER_LOCATION_FETCH_COMPLETE,
	USER_LOCATION_FETCH_FAIL
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
			hasFailedToLoad: false,
			hasLoadedFromServer: false,
			isRequesting: true,
			data: null
		}, {
			type: USER_LOCATION_FETCH_COMPLETE,
			countryCode: 'ES'
		} ) ).toEqual( {
			hasFailedToLoad: false,
			hasLoadedFromServer: true,
			isRequesting: false,
			data: { countryCode: 'ES' }
		} );
	} );

	it( 'should map `GB` to `UK` country codes', () => {
		expect( location( {
			hasFailedToLoad: false,
			hasLoadedFromServer: false,
			isRequesting: true,
			data: null
		}, {
			type: USER_LOCATION_FETCH_COMPLETE,
			countryCode: 'GB'
		} ) ).toEqual( {
			hasFailedToLoad: false,
			hasLoadedFromServer: true,
			isRequesting: false,
			data: { countryCode: 'UK' }
		} );
	} );

	it( 'should update `isRequesting` and `hasFailedToLoad` if the fetch fails', () => {
		expect( location( {
			hasFailedToLoad: false,
			hasLoadedFromServer: false,
			isRequesting: true,
			data: null
		}, {
			type: USER_LOCATION_FETCH_FAIL
		} ) ).toEqual( {
			hasFailedToLoad: true,
			hasLoadedFromServer: false,
			isRequesting: false,
			data: null
		} );
	} );
} );
