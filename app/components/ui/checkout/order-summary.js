// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );

// Internal dependencies
import FormToggle from 'components/ui/form/form-toggle';
import styles from './styles.scss';
import Tooltip from 'components/ui/tooltip';

const OrderSummary = ( { domain, domainCost, fields, hasTrademarkClaim, trackPrivacyToggle } ) => {
	return (
		<div className={ styles.orderSummary }>
			<h2>{ i18n.translate( 'Order Summary' ) }</h2>

			<div className={ styles.orderItem }>
				<span className={ styles.itemDescription }>
					{ domain.domainName }

					{ hasTrademarkClaim && (
						<span className={ styles.trademark }>TM</span>
					) }
				</span>

				<span>
					{ i18n.translate( '%(cost)s per year', { args: { cost: domainCost } } ) }
				</span>
			</div>

			{ ! hasTrademarkClaim && (
				<div className={ styles.orderItem }>
					<label>
						<span className={ styles.privacyLabel }>
							{ i18n.translate( 'Privacy Protection' ) }
						</span>

						<Tooltip
							text={
								<div className={ styles.privacyTooltip }>
									<p>{ i18n.translate( 'Some providers charge a fee to keep personal information out of the domain\'s public records.' ) }</p>
									<p>{ i18n.translate( 'We keep your details hidden for free, to protect your identity and prevent spam.' ) }</p>
								</div>
							}>
							<Gridicon
								className={ styles.gridicon }
								icon="help-outline"
								size={ 16 }
							/>
						</Tooltip>
					</label>

					<span>
						<FormToggle
							name="privacy-protection"
							{ ...fields.privacyProtection }
							trackChange={ trackPrivacyToggle }
						/>

						<span className={ styles.privacyProtectionPrice }>
							{ i18n.translate( 'Free' ) }
						</span>
					</span>
				</div>
			) }

			<div className={ classnames( styles.orderItem, styles.orderTotal ) }>
				<span>
					{ i18n.translate( 'Total cost' ) }
				</span>

				<span className="_price-with-currency-code">
					{ domain.totalCost } { domain.currencyCode }
				</span>
			</div>
		</div>
	);
};

OrderSummary.propTypes = {
	domain: PropTypes.object,
	domainCost: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	hasTrademarkClaim: PropTypes.bool.isRequired,
	trackPrivacyToggle: PropTypes.func.isRequired
};

export default withStyles( styles )( OrderSummary );
