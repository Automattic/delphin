// Internal dependencies
import {
	NOTICE_ADD
} from 'reducers/action-types';
import { recordTracksEvent } from 'actions/analytics';

export const logErrorNoticesMiddleware = store => next => action => {
	const { notice, type } = action;

	switch ( type ) {
		case NOTICE_ADD:
			if ( notice.status === 'error' ) {
				const location = store.getState().routing.locationBeforeTransitions;
				const url = `${ location.pathname }${ location.search }`;
				store.dispatch( recordTracksEvent( 'delphin_error_message_show', {
					error_message: notice.message,
					path: url
				} ) );
			}
			break;
	}

	return next( action );
};
