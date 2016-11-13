// Internal dependencies
import config, { isEnabled } from 'config';
import { loadScript } from 'lib/load-script';
import { TRANSACTION_CREATE_COMPLETE } from 'reducers/action-types';

if ( isEnabled( 'ad_tracking' ) ) {
	loadScript( 'https://www.googleadservices.com/pagead/conversion_async.js' );
}

export const adTrackingMiddleware = () => next => action => {
	const { type } = action;

	switch ( type ) {
		case TRANSACTION_CREATE_COMPLETE:
			// users might block google_trackConversion, we must not fail because of it
			if ( isEnabled( 'ad_tracking' ) && typeof window.google_trackConversion === 'function' ) {
				window.google_trackConversion( {
					google_conversion_id: config( 'google_conversion_id' ),
					google_conversion_format: 3,
					google_conversion_label: config( 'google_conversion_label' ),
				} );
			}
	}

	return next( action );
};
