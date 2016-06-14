// External dependencies
import { combineReducers } from 'redux';

// Internal dependencies
import { countries } from './countries';
import { states } from './states';

export default combineReducers( { countries, states } );
