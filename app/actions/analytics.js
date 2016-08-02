/** @ssr-ready **/

import curry from 'lodash/curry';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import property from 'lodash/property';

import {
	ANALYTICS_EVENT_RECORD,
	ANALYTICS_MULTI_TRACK,
	ANALYTICS_PAGE_VIEW_RECORD,
	ANALYTICS_STAT_BUMP
} from 'reducers/action-types';

const mergedMetaData = ( a, b ) => [
	...get( a, 'meta.analytics', [] ),
	...get( b, 'meta.analytics', [] )
];

/***
 * Wraps an action creator with analytics action
 * @param {Function|Object} analyticsAction some analytics action
 * @param {Function|Object} actionCreator action creator, a function, or a static action - an object
 * @returns {Function} a wrapped action creator, that will return the original action + analytics action
 */
const joinAnalytics = ( analyticsAction, actionCreator ) => {
	// we return a new action creator, that wraps the real action creator
	return ( ...args ) => {
		const action = isFunction( actionCreator ) ? actionCreator( ...args ) : actionCreator;
		const dispatchedAnalyticsAction = isFunction( analyticsAction ) ? analyticsAction( ...args ) : analyticsAction;

		// if the action is a thunk, we wrap it with our own
		if ( isFunction( action ) ) {
			return dispatch => {
				dispatch( dispatchedAnalyticsAction );
				return action( dispatch );
			};
		}

		return merge( {}, action, { meta: { analytics: mergedMetaData( dispatchedAnalyticsAction, action ) } } );
	};
};

export const composeAnalytics = ( ...analytics ) => ( {
	type: ANALYTICS_MULTI_TRACK,
	meta: {
		analytics: analytics.map( property( 'meta.analytics' ) )
	}
} );

export const withAnalytics = curry( joinAnalytics );

export const bumpStat = ( group, name ) => ( {
	type: ANALYTICS_STAT_BUMP,
	meta: {
		analytics: [ {
			type: ANALYTICS_STAT_BUMP,
			payload: { group, name }
		} ]
	}
} );

export const recordEvent = ( service, args ) => ( {
	type: ANALYTICS_EVENT_RECORD,
	meta: {
		analytics: [ {
			type: ANALYTICS_EVENT_RECORD,
			payload: Object.assign( {}, { service }, args )
		} ]
	}
} );

export const recordGoogleEvent = ( category, action, label, value ) =>
	recordEvent( 'ga', { category, action, label, value } );

export const recordTracksEvent = ( name, properties ) =>
	recordEvent( 'tracks', { name, properties } );

export const recordPageView = ( url, title, service ) => ( {
	type: ANALYTICS_PAGE_VIEW_RECORD,
	meta: {
		analytics: [ {
			type: ANALYTICS_PAGE_VIEW_RECORD,
			payload: {
				service,
				url,
				title
			}
		} ]
	}
} );

export const recordGooglePageView = ( url, title ) =>
	recordPageView( url, title, 'ga' );
