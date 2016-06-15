// Internal dependencies
import { checkout } from '..';
import {
	CREATE_SITE_COMPLETE,
	CREATE_TRANSACTION_COMPLETE,
	DOMAIN_SELECT
} from 'reducers/action-types';

jest.unmock( '..' );

describe( 'checkout reducer', () => {
	it( 'should throw an error when state and action are undefined', () => {
		expect( checkout ).toThrowError( TypeError );
	} );

	it( 'should throw an error when action is undefined', () => {
		expect( () => {
			return checkout( {} );
		} ).toThrowError( TypeError );
	} );

	it( 'should return an empty state when state is undefined and action is empty', () => {
		expect( checkout( undefined, {} ) ).toEqual( {} );
	} );

	it( 'should return original state when action is empty', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$5.00' } ),
			newState = checkout( originalState, {} );

		expect( newState ).toEqual( originalState );
	} );

	it( 'should return original state when action type is not supported', () => {
		const originalState = Object.freeze( { domain: 'example.com' } ),
			newState = checkout( originalState, { type: 'ORDER_CHEESE_BURGER' } );

		expect( newState ).toEqual( originalState );
	} );
} );

describe( 'checkout reducer for select domain action', () => {
	it( 'should return state with undefined domain when provided domain is undefined', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$10.00' } ),
			newState = checkout( originalState, { type: DOMAIN_SELECT } );

		expect( newState ).toEqual( { domain: undefined } );
	} );

	it( 'should return state with new domain', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$15.00' } ),
			newState = checkout( originalState, { value: { domain_name: 'wordpress.org', cost: '$20.00' }, type: DOMAIN_SELECT } );

		expect( newState ).toEqual( { domain: 'wordpress.org', cost: '$20.00' } );
	} );
} );

describe( 'checkout reducer for create site complete action', () => {
	it( 'should return state with new site', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$25.00' } ),
			newState = checkout( originalState, {
				blogId: 1234,
				domain: 'example.com',
				cost: '$25.00',
				type: CREATE_SITE_COMPLETE
			} );

		expect( newState ).toEqual( {
			domain: 'example.com',
			cost: '$25.00',
			site: {
				blogId: 1234,
				domain: 'example.com'
			}
		} );
	} );
} );

describe( 'checkout reducer for create transaction complete action', () => {
	it( 'should return state with new user', () => {
		const originalState = Object.freeze( { domain: 'example.com', cost: '$30.00' } ),
			newState = checkout( originalState, {
				form: {
					cvv: 'johndoe@example.com',
					'credit-card-number': 4485839645479525,
					'expiration-date': '03/18',
					name: 'John Doe',
					'postal-code': 12345
				},
				type: CREATE_TRANSACTION_COMPLETE
			} );

		expect( newState ).toEqual( {
			domain: 'example.com',
			cost: '$30.00',
			transaction: {
				cvv: 'johndoe@example.com',
				'credit-card-number': 4485839645479525,
				'expiration-date': '03/18',
				name: 'John Doe',
				'postal-code': 12345
			}
		} );
	} );
} );
