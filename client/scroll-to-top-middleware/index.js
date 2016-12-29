// External dependencies
import get from 'lodash/get';
import { LOCATION_CHANGE } from 'react-router-redux';

const getCurrentPathname = state => get( state, 'routing.locationBeforeTransitions.pathname' );

export const scrollToTopMiddleware = store => next => action => {
	const { type, payload } = action;

	switch ( type ) {
		case LOCATION_CHANGE:
			if ( getCurrentPathname( store.getState() ) !== payload.pathname ) {
				window.scrollTo( 0, 0 );
			}
	}

	return next( action );
};
