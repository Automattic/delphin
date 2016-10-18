jest.disableAutomock();

// Internal dependencies
import {
	SERVICE_FETCH,
	SERVICE_FETCH_COMPLETE,
	SERVICE_FETCH_FAIL,
} from 'reducers/action-types';
import { service } from '..';

describe( 'state.service reducer', () => {
	it( 'should return its initial state for unrelated actions', () => {
		expect( service( undefined, { type: 'UNRELATED' } ) ).toEqual( {
			isRequesting: false,
			hasLoadedFromServer: false,
			domain: null,
			service: null
		} );
	} );

	it( 'should add a service with a true `isRequesting` property', () => {
		expect( service( undefined, { type: SERVICE_FETCH, domain: 'example.blog' } ) ).toEqual( {
			hasLoadedFromServer: false,
			isRequesting: true,
			domain: 'example.blog',
			service: null
		} );
	} );

	it( 'should update a service when it completes', () => {
		expect( service( {
			hasLoadedFromServer: false,
			isRequesting: true,
			domain: 'example.blog',
			service: null
		}, { type: SERVICE_FETCH_COMPLETE, domain: 'example.blog', service: 'wpcom' } ) ).toEqual( {
			hasLoadedFromServer: true,
			isRequesting: false,
			domain: 'example.blog',
			service: 'wpcom'
		} );
	} );

	it( 'should update a service with a false `isRequesting` when it fails', () => {
		expect( service( undefined, { type: SERVICE_FETCH_FAIL, domain: 'example.blog' } ) ).toEqual( {
			hasLoadedFromServer: false,
			isRequesting: false,
			domain: 'example.blog',
			service: null
		} );
	} );
} );
