// External dependencies
import get from 'lodash/get';

export const getCountries = state => state.territories.countries;

/**
 * Returns the list of states for the specified country.
 *
 * @param {object} state - global state tree
 * @param {string} countryCode - country code
 * @returns {object} - the corresponding list of states
 */
export const getStates = ( state, countryCode ) => {
	return get( state, `territories.states.${countryCode}`, {} );
};
