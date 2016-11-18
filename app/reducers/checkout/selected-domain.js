// Internal dependencies
import {
	DOMAIN_SELECT,
} from 'reducers/action-types';

export const initialState = {
	currencyCode: null,
	details: null,
	domainName: null,
	isPremium: null,
	relevance: null,
	totalCost: null
};

export const selectedDomain = ( state = initialState, action ) => {
	const { type } = action;

	switch ( type ) {
		case DOMAIN_SELECT:
			return action.value;

		default:
			return state;
	}
};
