// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { countriesSupportedByDomains } from './countries-supported-by-domains';
import { states } from './states';

export default combineReducers( { countriesSupportedByDomains, states } );
