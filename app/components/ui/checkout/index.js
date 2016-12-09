// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import OrderSummary from './order-summary';
import PaymentForm from './payment-form';
import styles from './styles.scss';
import scrollToTop from 'components/containers/scroll-to-top';
import SiftScience from 'lib/sift-science';
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

	renderProcessing() {
		return (
			<div className={ styles.processingPayment }>
				<div className={ styles.icon }></div>
				<p>{ i18n.translate( 'Processing…' ) }</p>
			</div>
		);
	},

	render() {
		const { domain, domainCost, errors, fields, handleSubmit, isPurchasing, trackPrivacyToggle } = this.props;

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
						<PaymentForm fields={ fields } />

						<OrderSummary
							domain={ domain }
							domainCost={ domainCost }
							fields={ fields }
							trackPrivacyToggle={ trackPrivacyToggle } />

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

						{ isPurchasing && this.renderProcessing() }
					</Form>
				</div>
			</DocumentTitle>
		);
	}
} );

export default scrollToTop( withStyles( styles )( withPageView( Checkout, 'Checkout' ) ) );
