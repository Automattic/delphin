// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { countriesSupportedByCheckout } from './countries-supported-by-checkout';
import { countriesSupportedByDomains } from './countries-supported-by-domains';
import { states } from './states';

export default combineReducers( {
	countriesSupportedByCheckout,
	countriesSupportedByDomains,
	states
} );
