// External dependencies
import get from 'lodash/get';

/**
 * Retrieves the connection state after domain update.
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the connection, or null if not found
 */
export const getConnection = ( state ) => {
	return get( state, 'domain.updateDomain.data.results.success' );
};
