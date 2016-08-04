// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import range from 'lodash/range';
import padStart from 'lodash/padStart';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );

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
import withPageView from 'lib/analytics/with-page-view';
import Select from 'components/ui/form/select';
import Tooltip from 'components/ui/tooltip';

const Checkout = React.createClass( {
	propTypes: {
		checkout: PropTypes.object.isRequired,
		domain: PropTypes.object,
		domainApplicationCost: PropTypes.string.isRequired,
		domainCost: PropTypes.string.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		hasSelectedDomain: PropTypes.bool.isRequired,
		initializeForm: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		isPurchasing: PropTypes.bool.isRequired,
		redirectToCheckoutReview: PropTypes.func.isRequired,
		redirectToHome: PropTypes.func.isRequired,
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
			{ fields, handleSubmit, domainCost, domainApplicationCost } = this.props;

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
									<Select
										{ ...removeInvalidInputProps( fields.expirationMonth ) }
										className={ styles.expirationMonth }>
										<option>{ i18n.translate( 'Month' ) }</option>
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
										className={ styles.expirationYear }>
										<option>{ i18n.translate( 'Year' ) }</option>
										{
											range( ( new Date() ).getFullYear(), ( new Date() ).getFullYear() + 5 ).map(
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
							{ domainApplicationCost && <div className={ styles.orderItem }>
								<span>{ i18n.translate( 'Application' ) }</span>
								<span>{ domainApplicationCost }</span>
							</div> }
							<div className={ styles.orderItem }>
								<span>{ i18n.translate( 'Domain Registration' ) }</span>
								<span>{ domainCost }</span>
							</div>
							<div className={ styles.orderItem }>
								<label>
									{ i18n.translate( 'Privacy Protection' ) }
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

						<div className={ styles.submitArea }>
							<Button disabled={ this.isSubmitButtonDisabled() }>
								{ i18n.translate( 'Review application' ) }
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

export default withStyles( styles )( withPageView( Checkout, 'Checkout' ) );
