// Internal dependencies
import { selectDomain } from 'actions/domain-search';
import { fetchDomainPrice } from 'actions/domain-price';
import { getSelectedDomain } from 'reducers/checkout/selectors';

/***
 * If the requested domain different from the current selected domain
 * fetch it's price and select it
 *
 * @param {String} domainName the domain name to check
 * @returns {Function} Thunk that validates and selects the domain
 */
export function ensureDomainSelected( domainName ) {
	return ( dispatch, getState ) => {
		const selectedDomain = getSelectedDomain( getState() );
		if ( selectedDomain && selectedDomain.domainName === domainName ) {
			return Promise.resolve();
		}

		return dispatch( fetchDomainPrice( domainName ) ).then( result => dispatch( selectDomain( result.result ) ) );
	};
}
