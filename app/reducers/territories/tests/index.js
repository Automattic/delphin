jest.disableAutomock();

// Internal dependencies
import {
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH,
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_COMPLETE,
	COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_ERROR
} from 'reducers/action-types';
import { countriesSupportedByDomains } from '../countries-supported-by-domains';

describe( 'state.countries', () => {
	it( 'should return an empty list at first', () => {
		expect( countriesSupportedByDomains( undefined, { type: 'IRRELEVANT' } ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: false,
			data: null,
			error: null
		} );
	} );

	it( 'should update `isRequesting` when requesting', () => {
		expect( countriesSupportedByDomains( undefined, { type: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH } ).isRequesting ).toBe( true );
	} );

	it( 'should update each flag and the data when the response appears', () => {
		expect( countriesSupportedByDomains( {
			isRequesting: true,
			hasLoadedFromServer: false,
			data: null
		}, { type: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_COMPLETE, data: [ { code: 'IT', name: 'Italy' } ] } ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: true,
			data: [ { code: 'IT', name: 'Italy' } ]
		} );
	} );

	it( 'should reset isRequesting flag on error', () => {
		expect( countriesSupportedByDomains( {
			isRequesting: true,
			hasLoadedFromServer: false,
			data: null
		}, { type: COUNTRIES_SUPPORTED_BY_DOMAINS_FETCH_ERROR } ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: false,
			data: null
		} );
	} );
} );
