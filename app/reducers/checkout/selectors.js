// External dependencies
import isEmpty from 'lodash/isEmpty';

export const getCheckout = state => state.checkout;
export const getSelectedDomain = state => getCheckout( state ).selectedDomain;
export const getSelectedDomainPrice = state => getCheckout( state ).selectedDomainPrice.data;

export const getSelectedDomainPriceDetails = state => {
	if ( ! getCheckout( state ).selectedDomainPrice.hasLoadedFromServer ) {
		return [];
	}

	return getCheckout( state ).selectedDomainPrice.data.result.details;
};

export const getSelectedDomainCost = state => {
	const domainCostDetail = getSelectedDomainPriceDetails( state ).find( detail => detail.productSlug === 'delphin-domain' );

	return domainCostDetail ? domainCostDetail.cost : null;
};

export const getSelectedDomainApplicationCost = state => {
	const applicationCostDetail = getSelectedDomainPriceDetails( state ).find( detail => detail.productSlug === 'delphin-domain-application-fee' );

	return applicationCostDetail ? applicationCostDetail.cost : null;
};

export const hasSelectedDomain = state => ! isEmpty( getSelectedDomain( state ) );
export const isPurchasing = state => [ 'paygateConfiguration', 'paygateToken', 'transaction' ]
	.map( requestName => getCheckout( state )[ requestName ] )
	.some( request => request.isRequesting );

export const isRequestingDomainPrice = state => getCheckout( state ).selectedDomainPrice.isRequesting;
