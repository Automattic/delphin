/**
 * Gets the status of the availability of a given domain name from the state
 *
 * @param {object} state - Global store
 * @param {string} domainName - The domain name to find out about
 * @return {bool} Whether or not the domain availability has been fetched
 */
export const getDomainAvailabilityLoading = ( state, domainName ) => {
	if ( ! state.domainAvailability[ domainName ] ) {
		return false;
	}

	return state.domainAvailability[ domainName ].hasLoadedFromServer;
};

/**
 * Gets the availability of a given domain name from the state
 *
 * @param {object} state - Global store
 * @param {string} domainName - The domain name to find out about
 * @return {bool} Whether or not the domain is available
 */
export const getDomainAvailability = ( state, domainName ) => {
	if ( ! state.domainAvailability[ domainName ] || ! state.domainAvailability[ domainName ].data ) {
		return false;
	}

	return state.domainAvailability[ domainName ].data.results.isAvailable;
};
