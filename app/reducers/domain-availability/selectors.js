/**
 * Gets the requesting status of the availability of a given domain name from the state
 *
 * @param {object} state - Global store
 * @param {string} domainName - The domain name to find out about
 * @return {bool} Whether or not the domain availability is being fetched
 */
export const isDomainAvailabilityRequesting = ( state, domainName ) => {
	if ( ! state.domainAvailability[ domainName ] ) {
		return false;
	}

	return state.domainAvailability[ domainName ].isRequesting;
};

/**
 * Determines whether another domain is having its availability checked.
 *
 * @param {object} state - Global store
 * @param {string} domainName - The domain name to find out about
 * @return {bool} Whether or not the availability of a domain that is not the
 * given domain is being fetched.
 */
export const isDomainAvailabilityRequestingOtherDomain = ( state, domainName ) => (
	Object.keys( state.domainAvailability ).some( name => (
		isDomainAvailabilityRequesting( state, name ) && name !== domainName
	) )
);

/**
 * Gets the loaded status of the availability of a given domain name from the state
 *
 * @param {object} state - Global store
 * @param {string} domainName - The domain name to find out about
 * @return {bool} Whether or not the domain availability has been loaded
 */
export const hasDomainAvailabilityLoaded = ( state, domainName ) => {
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
