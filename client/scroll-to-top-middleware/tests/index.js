// External dependencies
import { LOCATION_CHANGE } from 'react-router-redux';

// Internal dependencies
import { scrollToTopMiddleware } from '..';

describe( 'scrollToTopMiddleware', () => {
	it( 'should not call `window.scrollTo` for unrelated actions', () => {
		window.scrollTo = jest.fn();

		scrollToTopMiddleware( null )( () => {} )( { type: 'UNRELATED' } );

		expect( window.scrollTo ).toHaveBeenCalledTimes( 0 );
	} );

	it( 'should scroll to the top when the path name changes', () => {
		window.scrollTo = jest.fn();

		const next = jest.fn();
		const store = { getState: jest.fn() };
		const action = {
			type: LOCATION_CHANGE,
			payload: {
				pathname: '/foo'
			}
		};

		scrollToTopMiddleware( store )( next )( action );

		expect( window.scrollTo ).toHaveBeenCalledWith( 0, 0 );
	} );
} );
