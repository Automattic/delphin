// External dependencies
import classnames from 'classnames';
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import range from 'lodash/range';
import padStart from 'lodash/padStart';

// Internal dependencies
import Button from 'components/ui/button';
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import Country from 'components/containers/country';
import creditCardDetails from 'lib/credit-card-details';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import capitalize from 'lodash/capitalize';
import FormToggle from 'components/ui/form/form-toggle';
import ValidationError from 'components/ui/form/validation-error';
import Input from 'components/ui/form/input';
import { removeInvalidInputProps } from 'lib/form';
import SiftScience from 'lib/sift-science';

const Checkout = React.createClass( {
	propTypes: {
		checkout: PropTypes.object.isRequired,
		fetchDomainPrice: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		initializeForm: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		isPurchasing: PropTypes.bool.isRequired,
		redirectToCheckoutReview: PropTypes.func.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		selectedDomainPrice: PropTypes.object.isRequired,
		submitting: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired
	},

	componentDidMount() {
		if ( ! this.props.checkout.selectedDomain.domain ) {
			this.props.redirectToHome();
		} else {
			SiftScience.recordUser( this.props.user.data.id );
		}

		if ( ! this.props.selectedDomainPrice.hasLoadedFromServer ) {
			this.props.fetchDomainPrice();
		}
	},

	getApplicationFee() {
		if ( ! this.props.selectedDomainPrice.hasLoadedFromServer ) {
			return null;
		}

		const applicationItem = find( this.props.selectedDomainPrice.data.details, {
			product_slug: 'delphin-domain-application-fee'
		} );

		if ( ! applicationItem ) {
			return null;
		}

		return applicationItem.cost;
	},

	getRegistrationFee() {
		if ( ! this.props.selectedDomainPrice.hasLoadedFromServer ) {
			return null;
		}

		const registrationItem = find( this.props.selectedDomainPrice.data.details, {
			product_slug: 'delphin-domain'
		} );

		if ( ! registrationItem ) {
			return null;
		}

		return registrationItem.cost;
	},

	validateSubmit( values ) {
		const errors = creditCardDetails.validateCardDetails( values ).errors;

		if ( ! isEmpty( errors ) ) {
			return Promise.reject( errors );
		}

		this.props.redirectToCheckoutReview();
	},

	isSubmitButtonDisabled() {
		const { isPurchasing, invalid, submitting } = this.props;

		return invalid || submitting || isPurchasing;
	},

	renderForm() {
		const months = i18n.moment.months(),
			{ fields, handleSubmit } = this.props,
			applicationFee = this.getApplicationFee(),
			registrationFee = this.getRegistrationFee();

		return (
			<DocumentTitle title={ i18n.translate( 'Checkout' ) }>
				<div>
					<div className={ styles.header }>
						<CheckoutProgressbar currentStep={ 3 } />
					</div>

					<form className={ styles.form } onSubmit={ handleSubmit( this.validateSubmit ) }>
						<div className={ styles.fieldArea }>
							<fieldset>
								<label>{ i18n.translate( 'Name on Card' ) }</label>
								<Input
									type="text"
									field={ fields.name }
									autoFocus
								/>
								<ValidationError field={ fields.name } />
							</fieldset>

							<fieldset>
								<label>{ i18n.translate( 'Card Number' ) }</label>
								<Input
									type="text"
									field={ fields.number }
								/>
								<ValidationError field={ fields.number } />
							</fieldset>

							<fieldset>
								<label>{ i18n.translate( 'Expiration' ) }</label>
								<div className={ styles.expiration }>
									<select
										{ ...removeInvalidInputProps( fields.expirationMonth ) }
										className={ styles.expirationMonth }>
										<option>{ i18n.translate( 'Month' ) }</option>
										{ months.map( ( monthName, monthIndex ) => {
											const monthNumber = monthIndex + 1;
											return (
												<option value={ padStart( monthNumber, 2, '0' ) } key={ monthNumber }>
													{ capitalize( monthName ) }
												</option>
											);
										} ) }
									</select>

									<select
										{ ...removeInvalidInputProps( fields.expirationYear ) }
										className={ styles.expirationYear }>
										<option>{ i18n.translate( 'Year' ) }</option>
										{
											range( ( new Date() ).getFullYear(), ( new Date() ).getFullYear() + 5 ).map(
												( year ) => <option value={ padStart( year - 2000, 2, '0' ) } key={ year } >{ year }</option>
											)
										}

									</select>
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
								<div className={ styles.billingAddress }>
									<div className={ styles.countryCode }>
										<label>{ i18n.translate( 'Country' ) }</label>
										<Country field={ fields.countryCode } supportedBy="checkout" />
									</div>
									<div className={ styles.postalCode }>
										<label>{ i18n.translate( 'Postal Code' ) }</label>
										<Input
											type="text"
											field={ fields.postalCode }
										/>
									</div>
								</div>
								<ValidationError fields={ [ fields.countryCode, fields.postalCode ] } />
							</fieldset>
						</div>

						<div className={ styles.orderSummary }>
							<h2>{ i18n.translate( 'Order Summary' ) }</h2>
							{ applicationFee && <div className={ styles.orderItem }>
								<span>{ i18n.translate( 'Application' ) }</span>
								<span>{ applicationFee }</span>
							</div> }
							<div className={ styles.orderItem }>
								<span>{ i18n.translate( 'Domain registration' ) }</span>
								<span>{ registrationFee }</span>
							</div>
							<div className={ styles.orderItem }>
								<label>{ i18n.translate( 'Privacy Protection' ) }</label>
								<span>
									<FormToggle
										name="privacy-protection"
										{ ...fields.privacyProtection }
									/>
									<span className={ styles.privacyProtectionPrice }>FREE</span>
								</span>
							</div>
							<div className={ classnames( styles.orderItem, styles.orderTotal ) }>
								<span>{ i18n.translate( 'Total cost' ) }</span>
								<span>{ this.props.selectedDomainPrice.data.cost }</span>
							</div>
						</div>

						<div className={ styles.submitArea }>
							<Button disabled={ this.isSubmitButtonDisabled() }>
								{ i18n.translate( 'Review Application' ) }
							</Button>
						</div>
					</form>
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

export default withStyles( styles )( Checkout );
