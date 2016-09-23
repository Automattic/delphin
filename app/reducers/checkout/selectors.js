// External dependencies
import every from 'lodash/every';

export const getCheckout = state => state.checkout;
export const getSelectedDomain = state => getCheckout( state ).selectedDomain;

export const getSelectedDomainDetails = state => {
	if ( ! getCheckout( state ).selectedDomain.details ) {
		return [];
	}

	return getCheckout( state ).selectedDomain.details;
};

export const getSelectedDomainCost = state => {
	const domainCostDetail = getSelectedDomainDetails( state ).find( detail => detail.productSlug === 'delphin-domain' );

	return domainCostDetail ? domainCostDetail.cost : null;
};

export const getSelectedDomainApplicationCost = state => {
	const applicationCostDetail = getSelectedDomainDetails( state ).find( detail => detail.productSlug === 'delphin-domain-app' );

	return applicationCostDetail ? applicationCostDetail.cost : null;
};

export const hasSelectedDomain = state => every( getSelectedDomain( state ), value => value !== null );

/**
 * Represents whether a purchase is currently being made. Returns true if:
 * - the paygate configuration, paygate token, or transaction requests are in
 *   progress.
 * - none of the requests have errors and one of the requests is loaded but not
 *   all have loaded.
 * The second condition is necessary to ensure that this function returns true
 * after a request has loaded but before the next request has started.
 *
 * @param {object} state - Global store
 * @return {bool} Whether or not a purchase is in progress.
 */
export const isPurchasing = state => {
	const requests = [ 'paygateConfiguration', 'paygateToken', 'transaction' ]
		.map( requestName => getCheckout( state )[ requestName ] );

	const isRequesting = requests.some( request => request.isRequesting );

	if ( isRequesting ) {
		return true;
	}

	const completedRequests = requests.filter( request => request.hasLoadedFromServer ).length;
	const requestsWithError = requests.filter( request => request.error ).length;

	return ! requestsWithError && completedRequests > 0 && completedRequests < requests.length;
};
