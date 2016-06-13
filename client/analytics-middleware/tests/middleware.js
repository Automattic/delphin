jest.disableAutomock();
jest.mock( 'lib/analytics' );

import {
	withAnalytics,
	bumpStat,
	recordGoogleEvent,
	recordGooglePageView,
	recordTracksEvent,
	recordPageView
} from 'actions/analytics';
import { dispatcher as dispatch } from '../index';
import analytics from 'lib/analytics';

describe( 'middleware', () => {
	describe( 'analytics dispatching', () => {
		it( 'should call mc.bumpStat', () => {
			dispatch( bumpStat( 'test', 'value' ) );

			expect( analytics.mc.bumpStat ).toBeCalled();
		} );

		it( 'should call tracks.recordEvent', () => {
			dispatch( recordTracksEvent( 'test', { name: 'value' } ) );

			expect( analytics.tracks.recordEvent ).toBeCalled();
		} );

		it( 'should call pageView.record', () => {
			dispatch( recordPageView( 'path', 'title' ) );

			expect( analytics.pageView.record ).toBeCalled();
		} );

		it( 'should call ga.recordEvent', () => {
			dispatch( recordGoogleEvent( 'category', 'action' ) );

			expect( analytics.ga.recordEvent ).toBeCalled();
		} );

		it( 'should call ga.recordPageView', () => {
			dispatch( recordGooglePageView( 'path', 'title' ) );

			expect( analytics.ga.recordPageView ).toBeCalled();
		} );

		it( 'should call tracks.recordEvent', () => {
			dispatch( recordTracksEvent( 'event', { name: 'value' } ) );

			expect( analytics.tracks.recordEvent ).toBeCalled();
		} );

		it( 'should call analytics events with wrapped actions', () => {
			dispatch( withAnalytics( bumpStat( 'name', 'value' ), { type: 'TEST_ACTION' } ) );

			expect( analytics.mc.bumpStat ).toBeCalled();
		} );
	} );
} );
