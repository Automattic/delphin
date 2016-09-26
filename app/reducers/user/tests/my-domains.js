jest.disableAutomock();

// Internal dependencies
import {
	LOGOUT_USER
} from 'reducers/action-types';
import { initialState } from 'lib/create-request-reducer';
import { myDomains } from '../my-domains';

describe( 'state.user.myDomains', () => {
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
