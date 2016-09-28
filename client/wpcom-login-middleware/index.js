// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// Internal dependencies
import { getTokenFromBearerCookie } from 'client/bearer-cookie';
import { getUserSettings } from 'reducers/user/selectors';
import {
	WPCOM_LOG_IN
} from 'reducers/action-types';
import WpcomLoginForm from './form';

export const wpcomLoginMiddleware = store => next => action => {
	const { type } = action;

	switch ( type ) {
		case WPCOM_LOG_IN:
			const userSettings = getUserSettings( store.getState() );

			if ( userSettings.hasLoadedFromServer ) {
				const { username } = userSettings.data;
				const bearerToken = getTokenFromBearerCookie();

				ReactDOM.render(
					<WpcomLoginForm
						username={ username }
						bearerToken={ bearerToken }
					/>,
					document.getElementById( 'wpcom-log-in' )
				);
			}
	}

	return next( action );
};
