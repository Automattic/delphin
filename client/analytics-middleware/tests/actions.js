jest.disableAutomock();

import { ANALYTICS_MULTI_TRACK } from 'reducers/action-types';
import {
	composeAnalytics,
	withAnalytics,
	bumpStat
} from 'actions/analytics';

describe( 'middleware', () => {
	describe( 'actions', () => {
		it( 'should trigger analytics and run passed thunks', () => {
			const dispatch = jest.fn();
			const testAction = dispatcher => dispatcher( { type: 'test' } );
			const testActionCreator = () => testAction;
			const statBump = bumpStat( 'splines', 'reticulated_count' );

			const wrappedActionCreator = withAnalytics( statBump, testActionCreator )();
			wrappedActionCreator( dispatch );

			expect( dispatch.mock.calls.length ).toBe( 2 );
		} );

		it( 'should compose multiple analytics calls', () => {
			const composite = composeAnalytics(
				bumpStat( 'spline_types', 'ocean' ),
				bumpStat( 'spline_types', 'river' )
			);

			expect( composite.type ).toBe( ANALYTICS_MULTI_TRACK );
			expect( composite.meta.analytics.length ).toBe( 2 );
		} );

		it( 'should compose multiple analytics calls without other actions', () => {
			const dispatch = jest.fn( action => typeof action === 'function' ? action( dispatch ) : action );
			const composite = composeAnalytics(
				bumpStat( 'spline_types', 'ocean' ),
				bumpStat( 'spline_types', 'river' )
			);
			const testAction = { type: 'RETICULATE_SPLINES' };

			withAnalytics( composite, testAction )()( dispatch );

			expect( dispatch ).toBeCalled();
			expect( dispatch.mock.calls[ 1 ][ 0 ].type ).toBe( testAction.type );
			expect( dispatch.mock.calls[ 0 ][ 0 ].meta.analytics.length ).toBe( 2 );
		} );

		it( 'should not swallow returned value from dispatched action', () => {
			const myResult = 'hello, yes, this is dog';
			const payloadAction = { type: 'SOME_UNRELATED_ACTION' };

			const myActionCreator = () => dispatch => {
				dispatch( payloadAction );
				return myResult;
			};

			const wrappedActionCreator = withAnalytics( bumpStat( 'splines', 'reticulated_count' ), myActionCreator );

			const dispatch = jest.fn( action => typeof action === 'function' ? action( dispatch ) : action );

			const result = wrappedActionCreator()( dispatch );
			expect( dispatch ).lastCalledWith( payloadAction );
			expect( result ).toBe( myResult );
		} );

		it( 'should call action creator with proper parameters', () => {
			const fakeDispatch = jest.fn( action => typeof action === 'function' ? action( fakeDispatch ) : action );
			const someActionCreator = jest.fn( value => ( {
				type: 'SOME_ACTION',
				value
			} ) );

			const fakeBindActionCreators = ( actionCreator, dispatch ) =>
				( ...args ) => dispatch( actionCreator( ...args ) );

			const composite = fakeBindActionCreators( withAnalytics( bumpStat( 'spline_types', 'ocean' ), someActionCreator ), fakeDispatch );

			composite( 123 );
			expect( someActionCreator ).toBeCalledWith( 123 );
		} );
	} );
} );
