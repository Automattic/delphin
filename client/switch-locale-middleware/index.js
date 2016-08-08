// External dependencies
import config from 'config';
import { push } from 'react-router-redux';

// Internal dependencies
import switchLocale from '../switch-locale';
import { LOCALE_SWITCH } from 'reducers/action-types';
import { stripLocaleSlug } from 'lib/routes';

export const switchLocaleMiddleware = store => next => action => {
	const { locale, type } = action;

	switch ( type ) {
		case LOCALE_SWITCH:
			let path = stripLocaleSlug( store.getState().routing.locationBeforeTransitions.pathname );

			if ( locale !== config( 'i18n_default_locale_slug' ) ) {
				path = `/${ locale }${ path }`;
			}

			switchLocale( locale );

			store.dispatch( push( path ) );
	}

	return next( action );
};
