// Internal dependencies
import analytics from 'lib/analytics';
import { TRANSACTION_CREATE_COMPLETE } from 'reducers/action-types';

export const adTrackingMiddleware = () => next => action => {
	const { type } = action;

	switch ( type ) {
		case TRANSACTION_CREATE_COMPLETE:
			const domainCostDetail = action.domain.details.find( detail => detail.productSlug === 'delphin-domain' ),
				domainCost = domainCostDetail ? domainCostDetail.cost.match( /\d+/ )[ 0 ] : null,
				domainCurrencyCode = action.domain.currencyCode;
			analytics.conversion.recordPurchase( action.receiptId, domainCost, domainCurrencyCode );
	}

	return next( action );
};
