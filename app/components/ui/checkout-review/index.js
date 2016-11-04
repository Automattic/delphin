// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import i18n from 'i18n-calypso';
import { card } from 'creditcards';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import Button from 'components/ui/button';
import PartialUnderline from 'components/ui/partial-underline';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import { getPath } from 'routes';
import TrackingLink from 'components/containers/tracking-link';
import withPageView from 'lib/analytics/with-page-view';
import scrollToTop from 'components/containers/scroll-to-top';

class CheckoutReview extends React.Component {
	handleSubmission( submitEvent ) {
		submitEvent.preventDefault();

		this.props.purchaseDomain()
			.then( () => this.props.redirect( 'success' ) )
			.catch( () => this.props.redirect( 'checkout' ) );
	}

	renderPaymentReview() {
		const ccSuffix = this.props.checkout.number.substring( this.props.checkout.number.length - 4 );
		const ccType = card.type( card.parse( this.props.checkout.number ) ).replace( / /g, '' ).toLowerCase();

		return <section className={ styles.paymentReview }>
			<h3 className={ styles.paymentTitle }>{ i18n.translate( 'Total' ) }</h3>
			<div className={ styles.paymentLine }>
				<div className={ styles.creditCard }>
					<span className={ styles.cardType + ' ' + styles[ ccType ] }></span>
					<span className={ styles.cardNumber }>**** { ccSuffix }</span>
				</div>
				<div className={ styles.cost }>
					{ this.props.selectedDomain.totalCost } { this.props.selectedDomain.currencyCode }
				</div>
			</div>
			<TrackingLink className={ styles.editLink } to={ getPath( 'checkout' ) } eventName="delphin_edit_payment_click">{ i18n.translate( 'edit payment method' ) }</TrackingLink>
		</section>;
	}

	renderContactInformationReview() {
		return <section className={ styles.contactReview }>
			<div className={ styles.offlineContact }>
				<div>{ this.props.contactInformation.firstName } { this.props.contactInformation.lastName }</div>
				<div>{ this.props.contactInformation.organization }</div>
				<div>{ this.props.contactInformation.address1 }</div>
				<div>{ this.props.contactInformation.address2 }</div>
				<div>
					{ this.props.contactInformation.city },&nbsp;
					{ this.props.contactInformation.state }&nbsp;
					{ this.props.contactInformation.postalCode }
				</div>
				<div>{ this.props.contactInformation.countryCode }</div>
			</div>

			<div className={ styles.onlineContact }>
				<div>{ this.props.contactInformation.phone }</div>
				<div>{ this.props.contactInformation.email }</div>
			</div>

			<TrackingLink className={ styles.editLink } to={ getPath( 'contactInformation' ) } eventName="delphin_edit_contact_click">{ i18n.translate( 'edit contact info' ) }</TrackingLink>
		</section>;
	}

	renderTermsOfService() {
		return <section className={ styles.terms }>
			{ i18n.translate( 'By submitting your application, you agree to our {{link}}domain name registration agreement{{/link}}. ' +
			'If you win this domain, you authorize your payment method to be charged on a recurring basis until you cancel, which you can do at any time.',
				{
					components: { link: <a href="https://wordpress.com/automattic-domain-name-registration-agreement/" target="_blank" /> }
				}
			) }
		</section>;
	}

	renderProcessing() {
		return (
			<div className={ styles.processingPayment }>
				<div className={ styles.icon }></div>
				<p>{ i18n.translate( 'Processing…' ) }</p>
			</div>
		);
	}

	renderCancelLink() {
		return (
			<TrackingLink className={ styles.cancelApplication } to={ getPath( 'home' ) } eventName="delphin_cancel_application_click">{ i18n.translate( 'Cancel application' ) }</TrackingLink>
		);
	}

	render() {
		const { applicationCost } = this.props;

		return ( <SunriseStep>
			<DocumentTitle title={ i18n.translate( 'Review your application' ) } />
			<SunriseStep.Header>
				<h1>
					{ i18n.translate( 'Review your application' ) }
				</h1>
				<h2>
					{ i18n.translate( 'Applying does not guarantee you get the domain. ' +
					'If others apply for it, you will be able to bid for it in an auction.' ) }
				</h2>
			</SunriseStep.Header>

			<SunriseStep.Form className={ styles.checkoutReview } onSubmit={ this.handleSubmission }>
				<section className={ styles.summary }>
					<PartialUnderline className={ styles.domain }>{ this.props.selectedDomain.domainName }</PartialUnderline>
					<p className={ styles.applicationFee }>
						{ applicationCost && [
							applicationCost,
							i18n.translate( 'Early Application' )
						].join( ' ' ) }
					</p>
					<p className={ styles.renewFee }>{ i18n.translate( 'renews at %(renewCost)s per year', { args: { renewCost: this.props.renewCost } } ) }</p>
				</section>
				{ this.renderPaymentReview() }
				{ this.renderContactInformationReview() }
				{ this.renderTermsOfService() }
				<Button className={ styles.purchaseButton } disabled={ this.props.isPurchasing }>{ i18n.translate( 'Submit application & pay now' ) }</Button>

				{ ! this.props.isPurchasing && this.renderCancelLink() }

				{ this.props.isPurchasing && this.renderProcessing() }
			</SunriseStep.Form>

			{ /* This is here so Cancel Application will have some space */ }
			<SunriseStep.Footer></SunriseStep.Footer>
		</SunriseStep> );
	}
}

CheckoutReview.propTypes = {
	applicationCost: PropTypes.string,
	checkout: PropTypes.shape( {
		number: PropTypes.string.isRequired
	} ).isRequired,
	contactInformation: PropTypes.object.isRequired,
	isPurchasing: PropTypes.bool.isRequired,
	purchaseDomain: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	renewCost: PropTypes.string.isRequired,
	selectedDomain: PropTypes.object.isRequired
};

export default withStyles( styles )( scrollToTop( withPageView( bindHandlers( CheckoutReview ), 'Checkout Review' ) ) );
