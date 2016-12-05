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
		domainCost: PropTypes.string.isRequired,
		errors: PropTypes.object,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		hasSelectedDomain: PropTypes.bool.isRequired,
		initializeForm: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		isPurchasing: PropTypes.bool.isRequired,
		purchaseDomain: PropTypes.func.isRequired,
		redirect: PropTypes.func.isRequired,
		resetCheckout: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired,
		trackPrivacyToggle: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	},

	componentDidMount() {
		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirect( 'home' );
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

	handleClickResetCheckoutAndRedirectToHome( event ) {
		this.handleClickResetCheckout( event );

		this.props.redirect( 'home' );
	},

	handleSubmission() {
		this.props.purchaseDomain()
			.then( () => this.props.redirect( 'success' ) )
			.catch( () => this.props.redirect( 'checkout' ) );
	},

	renderCheckoutError() {
		let errorMessage = i18n.translate( "We weren't able to process your payment." );
		let showTryDifferentDomain = false;

		const { transaction: { error } } = this.props.checkout;

		if ( error && [ 'duplicate_purchase', 'domain_availability_error', 'domain_availability_check_error' ].includes( error.code ) ) {
			errorMessage = error.message;

			if ( [ 'duplicate_purchase', 'domain_availability_error' ].includes( error.code ) ) {
				showTryDifferentDomain = true;
			}
		}

		if ( error && error.code === 'registrar_error' ) {
			errorMessage = i18n.translate( 'There was a problem trying to register your domain.' );
		}

		return (
			<div className={ styles.checkoutError }>
				<div className={ styles.icon }></div>
				<p>
					{ errorMessage }

					<span>
						{ showTryDifferentDomain
							? i18n.translate( 'You can {{link}}try a different domain{{/link}}.', {
								components: {
									link: <a onClick={ this.handleClickResetCheckoutAndRedirectToHome } href="#" />
								}
							} )
							: i18n.translate( "Don't worry! You can {{link}}try again{{/link}}.", {
								components: {
									link: <a onClick={ this.handleClickResetCheckout } href="#" />
								}
							} )
						}
					</span>
				</p>
			</div>
		);
	},

	hasError() {
		const { paygateConfiguration, paygateToken, transaction } = this.props.checkout;

		return paygateConfiguration.error || paygateToken.error || transaction.error;
	},

	handleCreditCardNumberChange( event ) {
		const { value } = event.target,
			rawFieldValue = card.parse( value );

		this.props.fields.number.onChange( card.format( rawFieldValue ) );
	},

	renderCreditCards() {
		const supportedCards = [
			'Visa',
			'MasterCard',
			'Discover',
			'American Express',
		];
		const number = this.props.fields.number.value;
		const cardType = card.type( card.parse( number ), true );
		const enableAllCards = supportedCards.indexOf( cardType ) === -1;
		const classes = {
			visa: ( enableAllCards || cardType === 'Visa' ) ? styles.visa : styles.visaDisabled,
			mastercard: ( enableAllCards || cardType === 'MasterCard' ) ? styles.mastercard : styles.mastercardDisabled,
			discover: ( enableAllCards || cardType === 'Discover' ) ? styles.discover : styles.discoverDisabled,
			amex: ( enableAllCards || cardType === 'American Express' ) ? styles.amex : styles.amexDisabled,
		};

		return (
			<div className={ styles.creditCards }>
				<div alt="Visa" className={ classes.visa } />
				<div alt="Mastercard" className={ classes.mastercard } />
				<div alt="Discover" className={ classes.discover } />
				<div alt="American Express" className={ classes.amex } />
			</div>
		);
	},

	renderForm() {
		const months = i18n.moment.months(),
			{ errors, fields, handleSubmit, domainCost } = this.props;

		return (
			<DocumentTitle title={ i18n.translate( 'Checkout' ) }>
				<div>
					<div className={ styles.header }>
						<CheckoutProgressbar currentStep={ 3 } />

						<h2 className={ styles.heading }>
							{ i18n.translate( 'Enter your payment information' ) }
						</h2>

					</div>

					<Form
						className={ styles.form }
						onSubmit={ handleSubmit( this.handleSubmission ) }
						errors={ errors }
						focusOnError
						autoComplete="off"
					>
						<Form.FieldArea>
							<fieldset>
								<label>{ i18n.translate( 'Name on Card' ) }</label>
								<Input
									type="text"
									field={ fields.name }
									autoFocus
									dir="ltr"
								/>
								<ValidationError field={ fields.name } />
							</fieldset>

							<fieldset>
								<label className={ styles.numberLabel }>{ i18n.translate( 'Card Number' ) }</label>
								{ this.renderCreditCards() }
								<Input
									type="text"
									field={ omit( fields.number, 'onChange' ) }
									dir="ltr"
									onChange={ this.handleCreditCardNumberChange }
									pattern="[0-9 ]*"
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
											range( ( new Date() ).getFullYear(), ( new Date() ).getFullYear() + 21 ).map(
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
									type="tel"
									field={ fields.cvv }
									pattern="[0-9]*"
									dir="ltr"
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
									dir="ltr"
								/>
								<ValidationError field={ fields.postalCode } />
							</fieldset>
						</Form.FieldArea>

						<div className={ styles.orderSummary }>
							<h2>{ i18n.translate( 'Order Summary' ) }</h2>
							<div className={ styles.orderItem }>
								<span className={ styles.itemDescription }>
									{ this.props.domain.domainName }
								</span>
								<span>{ i18n.translate( '%(cost)s per year', {
									args: { cost: domainCost },
								} ) }</span>
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
									<span className={ styles.privacyProtectionPrice }>
										{ i18n.translate( 'Free' ) }
									</span>
								</span>
							</div>
							<div className={ classnames( styles.orderItem, styles.orderTotal ) }>
								<span>{ i18n.translate( 'Total cost' ) }</span>
								<span className="_price-with-currency-code">{ this.props.domain.totalCost } { this.props.domain.currencyCode }</span>
							</div>
						</div>

						<div className={ styles.refundNotice }>
							<p>
								{ i18n.translate( 'By clicking "Register & pay now" you agree to our {{link}}domain name registration agreement{{/link}}. You also authorize your payment method to be charged on a recurring basis, until you cancel.',
									{
										components: {
											link: <a href="https://wordpress.com/automattic-domain-name-registration-agreement/" target="_blank" rel="noopener noreferrer" />
										}
									}
								) }
							</p>
							<p>
								{ i18n.translate( 'You can cancel at any time by contacting {{link}}help@get.blog{{/link}}. You confirm that you understand how automatic renewal works and how to cancel.',
									{
										components: {
											link: <a href="mailto:help@get.blog" />
										}
									}
								) }
							</p>
						</div>

						<Form.SubmitArea className={ styles.submitArea }>
							<Button disabled={ this.isSubmitButtonDisabled() }>
								{ i18n.translate( 'Register & pay now' ) }
							</Button>
						</Form.SubmitArea>

						<Form.Footer>
							<p>
								{ i18n.translate( 'You can cancel your purchase for a full refund within five days.' ) }
							</p>
						</Form.Footer>

						{ this.hasError() && this.renderCheckoutError() }

						{ this.props.isPurchasing && this.renderProcessing() }
					</Form>
				</div>
			</DocumentTitle>
		);
	},

	renderProcessing() {
		return (
			<div className={ styles.processingPayment }>
				<div className={ styles.icon }></div>
				<p>{ i18n.translate( 'Processing…' ) }</p>
			</div>
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
