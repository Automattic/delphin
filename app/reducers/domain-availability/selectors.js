/**
 * Gets the availability of a given domain name from the state
 *
 * @param {object} state - Global store
 * @param {domainName} string - The domain name to find out about
 * @return {bool} Whether or not the domain is available
 */
export const getDomainAvailability = ( state, domainName ) => {
	if ( ! state.domainAvailability[ domainName ] || ! state.domainAvailability[ domainName ].data ) {
		return false;
	}

	return state.domainAvailability[ domainName ].data.results.isAvailable;
};
