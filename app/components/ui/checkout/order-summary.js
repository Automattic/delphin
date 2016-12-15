// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import Tag from 'components/ui/tag';

const OrderSummary = ( { domain, domainCost, hasTrademarkClaim } ) => {
	return (
		<div className={ styles.orderSummary }>
			<h2>{ i18n.translate( 'Order Summary' ) }</h2>

			<div className={ styles.orderItem }>
				<span className={ styles.itemDescription }>
					{ domain.domainName }

					{ hasTrademarkClaim && (
						<Tag
							className={ styles.trademarkTag }
							type="trademark"
							title={ i18n.translate( 'This domain has a trademark claim' ) }
						>
							TM
						</Tag>
					) }
				</span>

				<span>
					{ i18n.translate( '%(cost)s per year', { args: { cost: domainCost } } ) }
				</span>
			</div>
		</div>
	);
};

OrderSummary.propTypes = {
	domain: PropTypes.object,
	domainCost: PropTypes.string.isRequired,
	hasTrademarkClaim: PropTypes.bool.isRequired
};

export default withStyles( styles )( OrderSummary );
