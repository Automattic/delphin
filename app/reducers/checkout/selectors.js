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

export const hasSelectedDomain = state => every( getSelectedDomain( state ), value => value !== null );

export const hasLoadedPaygateConfigurationFromServer = state => state.checkout.paygateConfiguration.hasLoadedFromServer;
