import { LOCATION_CHANGE } from 'react-router-redux';

const AUTH_PATHS = [ '/signup', '/log-in', '/verify' ];

const initialState = {
	history: [],
	lastLocationBeforeAuth: null
};

export default ( state = initialState, action ) => {
	const { type, payload } = action;

	if ( type === LOCATION_CHANGE ) {
		const { action: historyAction } = payload;

		switch ( historyAction ) {
			case 'POP':
				return {
					...state,
					history: state.history.filter( ( location ) => location.key !== payload.key )
				};

			case 'PUSH':
				return {
					history: [ ...state.history, payload ],
					lastLocationBeforeAuth: AUTH_PATHS.indexOf( payload.pathname ) === -1
						? payload
						: state.lastLocationBeforeAuth
				};
		}
	}

	return state;
};
