// Internal dependencies
import {
	WPCOM_REQUEST
} from 'reducers/action-types';

/**
 * Fetches the user domains.
 *
 * @returns {object} the corresponding action object
 */
export function fetchMyDomains() {
	return {
		type: WPCOM_REQUEST,
		method: 'get',
		params: { path: '/me' }
	};
}
