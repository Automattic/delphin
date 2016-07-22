export const getCheckout = state => state.checkout;
export const getSelectedDomain = state => getCheckout( state ).selectedDomain;
