// Internal dependencies
import {
	SECTION_FETCH,
	SECTION_FETCH_COMPLETE,
} from 'reducers/action-types';
import isSectionLoading from '..';

describe( 'state.ui.isSectionLoading', () => {
	it( 'should return an empty object initially', () => {
		expect( isSectionLoading( undefined, { type: 'UNRELATED_ACTION' } ) ).toEqual( {} );
	} );

	it( 'should set a key/value pair to true with `SECTION_FETCH`', () => {
		expect( isSectionLoading( {}, { type: SECTION_FETCH, section: 'myDomains' } ) ).toEqual( {
			myDomains: true
		} );
	} );

	it( 'should handle multiple keys', () => {
		expect( isSectionLoading( {
			myDomains: true,
			checkout: false,
		}, { type: SECTION_FETCH, section: 'setUpDomain' } ) ).toEqual( {
			myDomains: true,
			checkout: false,
			setUpDomain: true,
		} );
	} );

	it( 'should set a key/value pair to false with `SECTION_FETCH_COMPLETE`', () => {
		expect( isSectionLoading( { myDomains: true }, { type: SECTION_FETCH_COMPLETE, section: 'myDomains' } ) ).toEqual( {
			myDomains: false
		} );
	} );
} );
