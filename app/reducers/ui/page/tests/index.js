// Internal dependencies
import { PAGE_TITLE_UPDATE } from 'reducers/action-types';
import { title } from '..';

jest.unmock( '..' );

describe( 'state.ui.page.title', () => {
	it( 'should throw an error when state and action are undefined', () => {
		expect( title ).toThrowError( TypeError );
	} );

	it( 'should throw an error when action is undefined', () => {
		expect( () => {
			return title( 'Previous title' );
		} ).toThrowError( TypeError );
	} );

	it( 'should return original title when action type is not supported', () => {
		expect( title( 'Previous title', { type: 'ORDER_CHEESE_BURGER', title: 'Yummy' } ) ).toBe( 'Previous title' );
	} );

	it( 'should return default title when no title provided in action', () => {
		expect( title( 'Previous title', { type: PAGE_TITLE_UPDATE } ) ).toBe( 'MagicDomains' );
	} );

	it( 'should return default title when title provided in action is undefined', () => {
		expect( title( 'Previous title', { type: PAGE_TITLE_UPDATE, title: undefined } ) ).toBe( 'MagicDomains' );
	} );

	it( 'should return default title when title provided in action is empty', () => {
		expect( title( 'Previous title', { type: PAGE_TITLE_UPDATE, title: '' } ) ).toBe( 'MagicDomains' );
	} );

	it( 'should return title with prefix', () => {
		expect( title( 'Previous title', { type: PAGE_TITLE_UPDATE, title: 'Home' } ) ).toBe( 'Home | MagicDomains' );
	} );
} );
