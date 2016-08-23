// External dependencies
import { card } from 'creditcards';
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import padStart from 'lodash/padStart';
import range from 'lodash/range';
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );

// Internal dependencies
import Button from 'components/ui/button';
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import Country from 'components/containers/country';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import FormToggle from 'components/ui/form/form-toggle';
import Input from 'components/ui/form/input';
import Select from 'components/ui/form/select';
import styles from './styles.scss';
import Tooltip from 'components/ui/tooltip';
import capitalize from 'lodash/capitalize';
import { removeInvalidInputProps } from 'lib/form';
import scrollToTop from 'components/containers/scroll-to-top';
import SiftScience from 'lib/sift-science';
import ValidationError from 'components/ui/form/validation-error';
import withPageView from 'lib/analytics/with-page-view';

const Checkout = React.createClass( {
	propTypes: {
		checkout: PropTypes.object.isRequired,
		domain: PropTypes.object,
		domainApplicationCost: PropTypes.string.isRequired,
		domainCost: PropTypes.string.isRequired,
		errors: PropTypes.object,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		hasSelectedDomain: PropTypes.bool.isRequired,
		initializeForm: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		isPurchasing: PropTypes.bool.isRequired,
		redirectToCheckoutReview: PropTypes.func.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		resetCheckout: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired,
		trackPrivacyToggle: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	},

	componentDidMount() {
		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirectToHome();
		} else {
			SiftScience.recordUser( this.props.user.data.id );
		}
	},

	isSubmitButtonDisabled() {
		const { isPurchasing, invalid, submitting } = this.props;

		return invalid || submitting || isPurchasing;
	},

	handleClickResetCheckout( event ) {
		event.preventDefault();

		this.props.resetCheckout();
	},

	renderCheckoutError() {
		return (
			<div className={ styles.checkoutError }>
				<div className={ styles.icon }></div>
				<p>
					{ i18n.translate( 'We weren\'t able to process your payment.' ) }
					<span>
						{ i18n.translate( 'Don\'t worry! You can {{link}}try again{{/link}}.',
							{
								components: { link: <a onClick={ this.handleClickResetCheckout } href="#" /> }
							}
						) }
					</span>
				</p>
			</div>
		);
	},

	hasError() {
		const { checkout } = this.props;
		const { paygateConfiguration, paygateToken, transaction } = checkout;

		return paygateConfiguration.error || paygateToken.error || transaction.error;
	},

	handleCreditCardNumberChange( event ) {
		const { value } = event.target,
			rawFieldValue = card.parse( value );

		this.props.fields.number.onChange( card.format( rawFieldValue ) );
	},

	getCardTypeCSS( cardType ) {
		switch ( cardType ) {
			case 'Visa':
				return styles.visa;

			case 'MasterCard':
				return styles.mastercard;

			case 'Discover':
				return styles.discover;

			case 'American Express':
				return styles.amex;

			default:
				return styles.creditCardNumber;
		}
	},

	renderForm() {
		const months = i18n.moment.months(),
			{ errors, fields, handleSubmit, domainCost, domainApplicationCost } = this.props,
			cardType = card.type( card.parse( fields.number.value ), true );

		return (
			<DocumentTitle title={ i18n.translate( 'Checkout' ) }>
				<div>
					<div className={ styles.header }>
						<CheckoutProgressbar currentStep={ 3 } />
					</div>

					<Form
						className={ styles.form }
						onSubmit={ handleSubmit( this.props.redirectToCheckoutReview ) }
						errors={ errors }
						focusOnError
					>
						<Form.FieldArea>
							<fieldset>
								<label>{ i18n.translate( 'Name on Card' ) }</label>
								<Input
									type="text"
									field={ fields.name }
									autoFocus
								/>
								<ValidationError field={ fields.name } />
							</fieldset>

							<fieldset className={ this.getCardTypeCSS( cardType ) }>
								<label>{ i18n.translate( 'Card Number' ) }</label>
								<div className={ styles.creditCards }>
									<img alt="Visa" className={ styles.visa } src="/images/credit-cards/cc-visa.svg" width="32" />
									<img alt="Visa" className={ styles.visaDisabled } src="/images/credit-cards/cc-visa-disabled.svg" width="32" />
									<img alt="MasterCard" className={ styles.mastercard } src="/images/credit-cards/cc-mastercard.svg" width="32" />
									<img alt="MasterCard" className={ styles.mastercardDisabled } src="/images/credit-cards/cc-mastercard-disabled.svg" width="32" />
									<img alt="Discover" className={ styles.discover } src="/images/credit-cards/cc-discover.svg" width="32" />
									<img alt="Discover" className={ styles.discoverDisabled } src="/images/credit-cards/cc-discover-disabled.svg" width="32" />
									<img alt="American Express" className={ styles.amex } src="/images/credit-cards/cc-amex.svg" width="32" />
									<img alt="American Express" className={ styles.amexDisabled } src="/images/credit-cards/cc-amex-disabled.svg" width="32" />
								</div>

								<Input
									type="text"
									field={ omit( fields.number, 'onChange' ) }
									onChange={ this.handleCreditCardNumberChange }
								/>
								<ValidationError field={ fields.number } />
							</fieldset>

							<fieldset>
								<label>{ i18n.translate( 'Expiration' ) }</label>
								<div className={ styles.expiration }>
									<Select
										{ ...removeInvalidInputProps( fields.expirationMonth ) }
										className={ styles.expirationMonth }
									>
										<option value="">{ i18n.translate( 'Month' ) }</option>
										{ months.map( ( monthName, monthIndex ) => {
											const monthNumber = padStart( monthIndex + 1, 2, '0' );
											return (
												<option value={ monthNumber } key={ monthNumber }>
													{ monthNumber } - { capitalize( monthName ) }
												</option>
											);
										} ) }
									</Select>

									<Select
										{ ...removeInvalidInputProps( fields.expirationYear ) }
										className={ styles.expirationYear }
									>
										<option value="">{ i18n.translate( 'Year' ) }</option>
										{
											range( ( new Date() ).getFullYear(), ( new Date() ).getFullYear() + 6 ).map(
												( year ) => <option value={ padStart( year - 2000, 2, '0' ) } key={ year } >{ year }</option>
											)
										}

									</Select>
								</div>
								<ValidationError fields={ [
									fields.expirationMonth,
									fields.expirationYear
								] } />
							</fieldset>

							<fieldset className={ styles.securityCode }>
								<label>{ i18n.translate( 'Security Code' ) }</label>
								<Input
									type="text"
									field={ fields.cvv }
								/>
								<ValidationError field={ fields.cvv } />
							</fieldset>

							<fieldset>
								<label>{ i18n.translate( 'Country' ) }</label>
								<Country
									field={ fields.countryCode }
									supportedBy="checkout"
								/>
								<ValidationError field={ fields.countryCode } />
							</fieldset>

							<fieldset>
								<label>{ i18n.translate( 'Postal Code' ) }</label>
								<Input
									type="text"
									field={ fields.postalCode }
								/>
								<ValidationError field={ fields.postalCode } />
							</fieldset>
						</Form.FieldArea>

						<div className={ styles.orderSummary }>
							<h2>{ i18n.translate( 'Order Summary' ) }</h2>
							{ domainApplicationCost && <div className={ styles.orderItem }>
								<span className={ styles.itemDescription }>{ i18n.translate( 'Application' ) } { i18n.translate( '(one-time fee)' ) }</span>
								<span>{ domainApplicationCost }</span>
							</div> }
							<div className={ styles.orderItem }>
								<span className={ styles.itemDescription }>{ i18n.translate( 'Domain Registration' ) } { i18n.translate( '(recurring yearly fee)' ) }</span>
								<span>{ domainCost }</span>
							</div>
							<div className={ styles.orderItem }>
								<label>
									<span className={ styles.privacyLabel }>
										{ i18n.translate( 'Privacy Protection' ) }
									</span>
									<Tooltip
										text={
											<div>
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
										trackChange={ this.props.trackPrivacyToggle }
									/>
									<span className={ styles.privacyProtectionPrice }>FREE</span>
								</span>
							</div>
							<div className={ classnames( styles.orderItem, styles.orderTotal ) }>
								<span>{ i18n.translate( 'Total cost' ) }</span>
								<span>{ this.props.domain.totalCost }</span>
							</div>
						</div>

						<div className={ styles.refundNotice }>
							<p>
								<strong>{ i18n.translate( 'Apply risk free' ) }</strong>
								{ i18n.translate( 'Your payment will be refunded if your domain goes to auction and you don\'t win.' ) }
							</p>
						</div>

						<Form.SubmitArea className={ styles.submitArea }>
							<Button disabled={ this.isSubmitButtonDisabled() }>
								{ i18n.translate( 'Review application' ) }
							</Button>
						</Form.SubmitArea>

						{ this.hasError() && this.renderCheckoutError() }
					</Form>
				</div>
			</DocumentTitle>
		);
	},

	render() {
		return (
			<div>
				{ this.renderForm() }
			</div>
		);
	}
} );

export default scrollToTop( withStyles( styles )( withPageView( Checkout, 'Checkout' ) ) );
