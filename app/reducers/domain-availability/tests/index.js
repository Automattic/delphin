// External dependencies
import deepFreeze from 'deep-freeze';

// Internal dependencies
import { domainAvailability } from '..';

describe( 'domain availability reducer', () => {
	it( 'should throw an error when state and action are undefined', () => {
		expect( domainAvailability ).toThrowError( TypeError );
	} );

	it( 'should throw an error when action is undefined', () => {
		expect( () => {
			return domainAvailability( {} );
		} ).toThrowError( TypeError );
	} );

	it( 'should return initial state when state is undefined and action is empty', () => {
		expect( domainAvailability( undefined, {} ) ).toEqual( {} );
	} );

	it( 'should return original state when action is empty', () => {
		const originalState = deepFreeze( {
				'domain-name.blog': {
					data: null,
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				}
			} ),
			newState = domainAvailability( originalState, {} );

		expect( newState ).toBe( originalState );
	} );

	it( 'should return original state when action type is not supported', () => {
		const originalState = deepFreeze( {
				'domain-name.blog': {
					data: null,
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				}
			} ),
			newState = domainAvailability( originalState, { type: 'ORDER_CHEESE_BURGER' } );

		expect( newState ).toBe( originalState );
	} );

	it( 'should return original state when a domainName is not specified', () => {
		const originalState = deepFreeze( {
				'domain-name.blog': {
					data: null,
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				}
			} ),
			newState = domainAvailability( originalState, { type: 'DOMAIN_AVAILABILITY_FETCH' } );

		expect( newState ).toBe( originalState );
	} );

	it( 'should add a new domain to the state when there is a domainName in the action', () => {
		const originalState = deepFreeze( {
				'domain-name.blog': {
					data: null,
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				}
			} ),
			newState = domainAvailability( originalState, { type: 'DOMAIN_AVAILABILITY_FETCH', domainName: 'another-domain-name.blog' } ),
			expectedState = {
				'domain-name.blog': {
					data: null,
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				},
				'another-domain-name.blog': {
					data: null,
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				}
			};

		expect( newState ).toEqual( expectedState );
	} );

	it( 'should NOT overwrite the domain in the state when it already exists', () => {
		const originalState = deepFreeze( {
				'domain-name.blog': {
					data: null,
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				},
				'another-domain-name.blog': {
					data: { 'some': 'dummy-data' },
					error: null,
					isRequesting: true,
					hasLoadedFromServer: false,
				}
			} ),
			newState = domainAvailability( originalState, { type: 'DOMAIN_AVAILABILITY_FETCH', domainName: 'another-domain-name.blog' } );

		expect( newState ).toBe( originalState );
	} );
} );
