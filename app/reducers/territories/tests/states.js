jest.disableAutomock();

// Internal dependencies
import {
	STATES_FETCH,
	STATES_FETCH_COMPLETE,
	STATES_FETCH_ERROR,
} from 'reducers/action-types';
import { states } from '../states';

describe( 'state.territories.states reducer', () => {
	it( 'should return an empty object for unrelated actions', () => {
		expect( states( undefined, { type: 'UNRELATED' } ) ).toEqual( {} );
	} );

	it( 'should update `isRequesting` for the given country when fetching', () => {
		expect( states( undefined, {
			type: STATES_FETCH,
			countryCode: 'US'
		} ).US.isRequesting ).toBe( true );
	} );

	it( 'should update `isRequesting` for the given country when there was an error', () => {
		expect( states( {
			US: { isRequesting: true }
		}, {
			type: STATES_FETCH_ERROR,
			countryCode: 'US'
		} ).US.isRequesting ).toBe( false );
	} );

	it( 'should update `isRequesting`, `hasLoadedFromServer`, and `data` for the given country when fetching completes', () => {
		expect( states( {
			US: { isRequesting: true }
		}, {
			type: STATES_FETCH_COMPLETE,
			countryCode: 'US',
			data: [ 'Alaska', 'Arkansas' ]
		} ).US ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: true,
			data: [ 'Alaska', 'Arkansas' ]
		} );
	} );

	it( 'should merge new countries into the list of countries without overwriting existing countries', () => {
		expect( states( {
			US: {
				isRequesting: false,
				hasLoadedFromServer: true,
				data: [ 'Alaska', 'Arkansas' ]
			}
		}, {
			type: STATES_FETCH_COMPLETE,
			countryCode: 'FR',
			data: [ 'Brittany', 'Martinique' ]
		} ) ).toEqual( {
			FR: {
				hasLoadedFromServer: true,
				isRequesting: false,
				data: [ 'Brittany', 'Martinique' ]
			},
			US: {
				isRequesting: false,
				hasLoadedFromServer: true,
				data: [ 'Alaska', 'Arkansas' ]
			}
		} );
	} );
} );
