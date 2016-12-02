// Internal dependencies
import { addNotice } from 'actions/notices';
import { WPCOM_REQUEST_FAIL } from 'reducers/action-types';

export const wpcomNoticesMiddleware = store => next => action => {
	const { type, error, originalAction } = action;

	switch ( type ) {
		case WPCOM_REQUEST_FAIL:
			if ( typeof originalAction.fail !== 'function' ) {
				store.dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );
			}
	}

	return next( action );
};
