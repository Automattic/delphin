import analyticsModule from 'lib/analytics';
import has from 'lodash/has';
import invoke from 'lodash/invoke';

import {
	ANALYTICS_EVENT_RECORD,
	ANALYTICS_PAGE_VIEW_RECORD,
	ANALYTICS_STAT_BUMP,
	ANALYTICS_USER_IDENTIFY,
} from 'reducers/action-types';

const eventServices = {
	ga: ( { category, action, label, value } ) => analyticsModule.ga.recordEvent( category, action, label, value ),
	tracks: ( { name, properties } ) => analyticsModule.tracks.recordEvent( name, properties ),
	criteo: ( { domain } ) => analyticsModule.criteo.recordSearch( domain )
};

const pageViewServices = {
	ga: ( { url, title } ) => analyticsModule.ga.recordPageView( url, title ),
	default: ( { url, title } ) => analyticsModule.pageView.record( url, title )
};

const statBump = ( { group, name } ) => analyticsModule.mc.bumpStat( group, name );

export const dispatcher = ( { meta: { analytics } } ) => {
	analytics.forEach( ( { type, payload } ) => {
		const { service = 'default' } = payload;

		switch ( type ) {
			case ANALYTICS_EVENT_RECORD:
				return invoke( eventServices, service, payload );

			case ANALYTICS_PAGE_VIEW_RECORD:
				return invoke( pageViewServices, service, payload );

			case ANALYTICS_STAT_BUMP:
				return statBump( payload );

			case ANALYTICS_USER_IDENTIFY:
				return analyticsModule.tracks.identifyUser( payload );
		}
	} );
};

export const analyticsMiddleware = () => next => action => {
	if ( has( action, 'meta.analytics' ) ) {
		dispatcher( action );
	}

	return next( action );
};

export default analyticsMiddleware;
