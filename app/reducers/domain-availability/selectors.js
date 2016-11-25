/**
 * Gets the requesting status of the availability of a given domain name from the state
 *
 * @param {object} state - Global store
 * @param {string} domainName - The domain name to find out about
 * @return {bool} Whether or not the domain availability is being fetched
 */
export const getDomainAvailabilityIsRequesting = ( state, domainName ) => {
	if ( ! state.domainAvailability[ domainName ] ) {
		return false;
	}

	return state.domainAvailability[ domainName ].isRequesting;
};

/**
 * Gets the loaded status of the availability of a given domain name from the state
 *
 * @param {object} state - Global store
 * @param {string} domainName - The domain name to find out about
 * @return {bool} Whether or not the domain availability has been loaded
 */
export const getDomainAvailabilityHasLoaded = ( state, domainName ) => {
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
