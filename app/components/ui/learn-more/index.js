// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import { getPath } from 'routes';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import Button from 'components/ui/button';
import Email from 'components/ui/form/email';
import { subscribeUser } from 'actions/learn-more';
import ValidationError from 'components/ui/form/validation-error';
import withPageView from 'lib/analytics/with-page-view';

class LearnMore extends React.Component {
	handleSubscribeUser() {
		const { addNotice, fields: { email }, resetForm } = this.props;

		return subscribeUser( email.value ).then( ( { result, msg } ) => {
			addNotice( {
				// Mailchimp error messages are prefixed with an integer to indicate which field has errored,
				// let's just strip it
				message: msg.replace( /\d+ - (.*)/, '$1' ),
				status: result
			} );

			if ( 'success' === result ) {
				resetForm();
			}
		} ).catch( error => {
			addNotice( {
				message: error.message,
				status: 'error'
			} );
		} );
	}

	componentDidMount() {
		const {
			hasLoadedPricesFromServer,
			isRequestingPricesFromServer,
			fetchPrices,
		} = this.props;

		if ( ! hasLoadedPricesFromServer && ! isRequestingPricesFromServer ) {
			fetchPrices();
		}
	}

	isSubmitButtonDisabled() {
		const { asyncValidating, invalid, submitting } = this.props;

		return asyncValidating || invalid || submitting;
	}

	render() {
		const {
			fields,
			handleSubmit,
			hasLoadedPricesFromServer,
			isRequestingPricesFromServer,
			prices
		} = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Get help with your .blog domain' ) } />

				<div className={ styles.formContainer }>
					<a name="newsletter"></a>
					<div className={ styles.headerContainer }>
						<h1 className={ styles.heading }>{ i18n.translate( 'Get .blog updates in your email' ) }</h1>
						<div className={ styles.text }>
							{
								i18n.translate( 'Sign up to receive updates about .blog.' )
							}
						</div>
					</div>
					<form className={ styles.form } noValidate onSubmit={ handleSubmit( this.handleSubscribeUser ) }>
						<div className={ styles.inputContainer }>
							<Email
								inputClassName={ styles.input }
								field={ fields.email }
								gridIconSize={ 32 }
								placeholder={ i18n.translate( 'Enter your email' ) }
							/>
							<ValidationError field={ fields.email } />
						</div>

						<div className={ styles.buttonContainer }>
							<Button disabled={ this.isSubmitButtonDisabled() }>{ i18n.translate( 'Get updates' ) }</Button>
						</div>
					</form>
				</div>

				<div className={ styles.content }>
					<div className={ styles.faqsHeader }>
						<h2>{ i18n.translate( 'Frequently Asked Questions' ) }</h2>
						<p>
							{ i18n.translate( 'Don\'t see your question here? {{link}}Contact get.blog support.{{/link}}', {
								components: {
									link: <a href={ config( 'support_link' ) } />
								}
							} ) }
						</p>
					</div>
					<div className={ styles.faqs }>
						<div className={ styles.faq } id="what-is-dot-blog">
							<h3>{ i18n.translate( 'What is .blog?' ) }</h3>

							<p>{ i18n.translate( '.blog is a new domain extension, available to the public since November 21st, 2016. It is a standard and open domain extension, so .blog domains work just like any other domain, such as .com or .xyz. Domains ending with .blog can be registered with all major domain sellers, including get.blog.' ) }</p>
						</div>

						<div className={ styles.faq } id="short-domains">
							<h3>{ i18n.translate( 'Why are short domains not available?' ) }</h3>

							<p>{ i18n.translate( 'All .blog domains with three characters or less are currently reserved by KKWT, the company managing the .blog domain extension. Some short domains have been released (such as get.blog), but none are currently available for public registration.' ) }</p>

							<p>{ i18n.translate( 'KKWT may release some or all short domains in the future. You can follow along and get updates on {{link}}KKWT’s blog{{/link}}.', {
								components: {
									link: <a href="https://my.blog/blog/" target="_blank" rel="noopener noreferrer" />
								}
							} ) }</p>
						</div>

						<div className={ styles.faq } id="prices">
							<h3>{ i18n.translate( 'Why are some .blog domains so expensive?' ) }</h3>

							<p>
								{ isRequestingPricesFromServer && (
									i18n.translate( 'Loading answer…' )
								) }

								{ hasLoadedPricesFromServer && (
									i18n.translate(
										'Most .blog domains on get.blog are available for %(price)s %(currency)s / year. ' +
										'However, some .blog domains carry a premium yearly price. The base prices for ' +
										'all .blog domains are set by KKWT, the company managing the .blog domain extension.',
										{
											args: {
												price: prices.domain.price,
												currency: prices.currency
											},
											comment: 'price is a price formatted like "$30", currency is a currency formatted like "USD".'
										}
									)
								) }
							</p>
						</div>

						<div className={ styles.faq } id="refunds">
							<h3>{ i18n.translate( 'Do you offer refunds?' ) }</h3>

							<p>{ i18n.translate( 'Domains registered on get.blog can be canceled for a full refund within five days of purchase. Contact us at {{link}}help@get.blog{{/link}} to request a refund.', {
								components: {
									link: <a href={ config( 'support_link' ) } />
								}
							} ) }</p>
						</div>

						<div className={ styles.faq } id="sawbuck">
							<h3>{ i18n.translate( 'What is wordpress.sawbuck.com?' ) }</h3>

							<p>{ i18n.translate( 'The domain sawbuck.com is used internally by get.blog. When registering a new domain, you may receive an email to verify your contact information. It is sent from help@wordpress.sawbuck.com, and contains a link to validate.sawbuck.com. This is a legitimate get.blog email, and the link is safe to click.' ) }</p>
						</div>

						<div className={ styles.faq } id="connect-domain">
							<h3>{ i18n.translate( 'How do I connect my domain to my site?' ) }</h3>

							<p>{ i18n.translate( 'Go to {{link}}My Domains{{/link}} to see all your domains and set them up. If your domain is already connected, you may have to reset it to the default settings before you can start the set up again.', {
								components: {
									link: <Link to={ getPath( 'myDomains' ) } />
								}
							} ) }</p>
						</div>

						<div className={ styles.faq } id="nameservers">
							<h3>{ i18n.translate( 'How do I set custom name servers?' ) }</h3>

							<p>{ i18n.translate( 'To choose custom servers for your domain, start setting it up from {{link}}My Domains{{/link}}, and then choose “Configure manually” on the next screen. If your domain is already connected, you may have to reset it to the default settings before you can start the set up again.', {
								components: {
									link: <Link to={ getPath( 'myDomains' ) } />
								}
							} ) }</p>
						</div>

						<div className={ styles.faq } id="transfer">
							<h3>{ i18n.translate( 'Can I transfer my domain?' ) }</h3>

							<p>{ i18n.translate( 'You can transfer your domain from get.blog to any other domain seller that supports it. However, new domains cannot be transferred for 60 days after they are registered. This “lock” period is standard for all domains. You can still start using your domain during this time, for example by setting custom name servers. Contact us at {{link}}help@get.blog{{/link}} for help with transferring your domain.', {
								components: {
									link: <a href={ config( 'support_link' ) } />
								}
							} ) }</p>
						</div>

						<div className={ styles.faq } id="contact-information">
							<h3>{ i18n.translate( 'Why do you need my contact information?' ) }</h3>

							<p>{ i18n.translate( 'Domain owners are required to share contact information in a public database called "whois". Our Privacy Protection feature protects your identity and prevents spam by using a forwarding service, keeping your personal details hidden.' ) }</p>

							<p>{ i18n.translate( 'Privacy Protection is enabled by default for all new domains. If you prefer to have your contact information publicly associated with your domain, contact us at {{link}}help@get.blog{{/link}} to disable Privacy Protection.', {
								components: {
									link: <a href={ config( 'support_link' ) } />
								}
							} ) }</p>
						</div>

						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'How can I update the contact information for my domain?' ) }</h3>

							<p>{ i18n.translate( 'Your contact information has to be kept current and correct, regardless of the Privacy Protection feature. If your information changed since you first registered your domain, please contact us at {{link}}help@get.blog{{/link}} to update it.', {
								components: {
									link: <a href={ config( 'support_link' ) } />
								}
							} ) }</p>
						</div>

						<div className={ styles.faq } id="contact-information-why-transfer">
							<h3>{ i18n.translate( 'Why am I asked about transferring my domain when I only changed my contact information?' ) }</h3>
							<p>
								{ i18n.translate(
									"When you update your domain's contact information and change the first name, " +
									'last name, organization name, or email address, it is considered a change of ' +
									"ownership, even if you're not actually transferring the domain to someone else. " +
									'If you are transferring the domain to a new owner, they (the “Transferee”) ' +
									'have to agree to the {{link}}Domain Registration Agreement{{/link}}.',
									{
										components: {
											link: <a href="https://wordpress.com/automattic-domain-name-registration-agreement/"
														target="_blank" rel="noopener noreferrer" />,
										}
									}
								) }
							</p>
						</div>
					</div>
				</div>
			</SunriseStep>
		);
	}
}

LearnMore.propTypes = {
	addNotice: PropTypes.func.isRequired,
	asyncValidating: PropTypes.bool.isRequired,
	fetchPrices: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasLoadedPricesFromServer: PropTypes.bool.isRequired,
	invalid: PropTypes.bool.isRequired,
	isRequestingPricesFromServer: PropTypes.bool.isRequired,
	prices: PropTypes.object,
	resetForm: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired
};

export default withStyles( styles )( withPageView( bindHandlers( LearnMore ), 'Learn More' ) );
