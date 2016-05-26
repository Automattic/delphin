jest.disableAutomock();

// Internal dependencies
import {
	COUNTRIES_FETCH,
	COUNTRIES_FETCH_COMPLETE,
	COUNTRIES_FETCH_ERROR
} from 'reducers/action-types';
import { countries } from '..';

describe( 'state.countries', () => {
	it( 'should return an empty list at first', () => {
		expect( countries( undefined, { type: 'IRRELEVANT' } ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: false,
			data: null
		} );
	} );

	it( 'should update `isRequesting` when requesting', () => {
		expect( countries( undefined, { type: COUNTRIES_FETCH } ).isRequesting ).toBe( true );
	} );

	it( 'should update each flag and the data when the response appears', () => {
		expect( countries( {
			isRequesting: true,
			hasLoadedFromServer: false,
			data: null
		}, { type: COUNTRIES_FETCH_COMPLETE, data: [ { code: 'IT', name: 'Italy' } ] } ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: true,
			data: [ { code: 'IT', name: 'Italy' } ]
		} );
	} );

	it( 'should reset isRequesting flag on error', () => {
		expect( countries( {
			isRequesting: true,
			hasLoadedFromServer: false,
			data: null
		}, { type: COUNTRIES_FETCH_ERROR } ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: false,
			data: null
		} );
	} );
} );
