export const getCheckout = state => state.checkout;
export const getSelectedDomain = state => getCheckout( state ).selectedDomain;
export const getSelectedDomainPrice = state => getCheckout( state ).selectedDomainPrice.data;
export const isPurchasing = state => [ 'paygateConfiguration', 'paygateToken', 'transaction' ]
	.map( requestName => getCheckout( state )[ requestName ] )
	.some( request => request.isRequesting );
