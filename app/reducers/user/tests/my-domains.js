jest.disableAutomock();

// Internal dependencies
import {
	LOGOUT_USER
} from 'reducers/action-types';
import { initialState } from 'lib/create-request-reducer';
import { myDomains } from '../my-domains';

describe( 'state.user.myDomains', () => {
	it( 'should return original state when action type is not supported', () => {
		const originalState = Object.freeze( {
			hasLoadedFromServer: false,
			isRequesting: false,
			results: [ 'example1.com', 'example2.com' ],
			query: 'example'
		} );

		expect( myDomains( originalState, { type: 'ORDER_CHEESE_BURGER' } ) ).toEqual( originalState );
	} );

	it( 'should return the initial state after the user is logged out', () => {
		expect( myDomains( {
			hasLoadedFromServer: true,
			isRequesting: false,
			data: {
				results: [
					{
						id: 12345,
						name: 'example.blog'
					}
				]
			}
		}, {
			type: LOGOUT_USER
		} ) ).toEqual( initialState );
	} );
} );
