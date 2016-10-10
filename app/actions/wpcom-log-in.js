// Internal dependencies
import { WPCOM_LOG_IN } from 'reducers/action-types';

export const logInToWpcom = destination => ( { type: WPCOM_LOG_IN, destination } );
