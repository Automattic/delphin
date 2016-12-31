// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import ContactInformationFormFactory from 'components/containers/contact-information-form-factory';
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';

const ContactInformationForm = ContactInformationFormFactory( 'contactInformation' );

class ContactInformation extends React.Component {
	componentWillMount() {
		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirectToHome();
			return;
		}
	}

	getPrivacyNoticeText() {
		const { hasTrademarkClaim } = this.props;

		if ( hasTrademarkClaim ) {
			return i18n.translate( 'Your contact information will be available in a public' +
				' database of domain owners, called "Whois".' );
		}

		return i18n.translate( 'Domain owners are required to share contact information publicly. ' +
			"We keep your personal information out of your domain's public records," +
			' to protect your identity and prevent spam.' );
	}

	handleFormValidation( values ) {
		const { domain: { domainName } } = this.props;
		return this.props.validateContactInformation( domainName, values );
	}

	handleFormSubmission() {
		this.props.redirectToCheckout();
	}

	render() {
		return (
			<DocumentTitle title={ i18n.translate( 'Contact Information' ) }>
				<div>
					<div className={ styles.header }>
						<CheckoutProgressbar currentStep={ 2 } />

						<h2 className={ styles.heading }>
							{ i18n.translate( 'Enter your contact information' ) }
						</h2>

						<h3 className={ styles.text }>
							{ i18n.translate( 'Your details are needed to register {{strong}}%(domain)s{{/strong}}.',
								{
									args: { domain: this.props.domain.domainName },
									components: { strong: <strong /> }
								}
							) }
						</h3>
					</div>

					<ContactInformationForm
						onValidate={ this.handleFormValidation }
						onFormSubmit={ this.handleFormSubmission }
						ctaLabel={ i18n.translate( 'Continue to checkout' ) }
						ctaSubmittingLabel={ i18n.translate( 'Taking you to checkout…' ) }
						footerContent={ this.getPrivacyNoticeText() }
					/>
				</div>
			</DocumentTitle>
		);
	}
}

ContactInformation.propTypes = {
	domain: PropTypes.object,
	hasSelectedDomain: PropTypes.bool.isRequired,
	hasTrademarkClaim: PropTypes.bool.isRequired,
	redirectToCheckout: PropTypes.func.isRequired,
	redirectToHome: PropTypes.func.isRequired,
	validateContactInformation: PropTypes.func.isRequired
};

export default withStyles( styles )( withPageView( bindHandlers( ContactInformation ), 'Contact Information' ) );
