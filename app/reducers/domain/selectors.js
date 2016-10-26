// External dependencies
import get from 'lodash/get';

/**
 * Returns the connection state after domain update.
 *
 * @param {object} state - global state tree
 * @returns {boolean} - true if connected
 */
export const isConnected = ( state ) => {
	return Boolean( get( state, 'domain.updateDomain.data.results.success' ) );
};
