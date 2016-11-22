// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import Button from 'components/ui/button';
import Email from 'components/ui/form/email';
import { subscribeUser } from 'actions/learn-more';
import ValidationError from 'components/ui/form/validation-error';

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

	isSubmitButtonDisabled() {
		const { asyncValidating, invalid, submitting } = this.props;

		return asyncValidating || invalid || submitting;
	}

	render() {
		const { fields, handleSubmit } = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Get help with your .blog domain' ) } />

				<div className={ styles.content }>
					<div className={ styles.faqsHeader }>
						<h2>{ i18n.translate( 'Frequently Asked Questions' ) }</h2>
						<p>
							{ i18n.translate( 'Don\'t see your question here? {{link}}Contact get.blog support.{{/link}}', {
								components: {
									link: <a href="mailto:help@get.blog" />
								}
							} ) }
						</p>
					</div>
					<div className={ styles.faqs }>
						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'What is .blog?' ) }</h3>
							<p>{ i18n.translate( '.blog is a new domain extension, available to the public since November 21st, 2016. Domains ending with .blog work just like any other domain, such as .com or .xyz.' ) }</p>
						</div>
						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'Do you offer refunds?' ) }</h3>
							<p>{ i18n.translate( 'Domains you registered on get.blog can be canceled for a full refund within five days of purchase. Contact us at help@get.blog to request a refund.' ) }</p>
						</div>
						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'Why are some .blog domains so expensive?' ) }</h3>
							<p>{ i18n.translate( 'The price for most .blog domains on get.blog is $30 USD. However, some .blog domains carry a premium yearly price, set by KKWT, the company that runs the .blog domain extension.' ) }</p>
						</div>
						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'How can I set the nameservers for my .blog domain?' ) }</h3>
							<p>{ i18n.translate( '[Needs copy]' ) }</p>
						</div>
						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'Can I transfer a .blog domain registered at get.blog to another registrar?' ) }</h3>
							<p>{ i18n.translate( '[Needs copy]' ) }</p>
						</div>
						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'What is sawbuck.com?' ) }</h3>
							<p>{ i18n.translate( 'When you register a new domain, you may get a generic looking email requesting you to verify the domain. The subject line is VERIFICATION REQUIRED and it will come from help@wordpress.sawbuck.com. The links in this email must be clicked to retain the domain, and are not harmful in any way.' ) }</p>
						</div>
						<div className={ styles.faq }>
							<h3>{ i18n.translate( 'Why are short domains not available?' ) }</h3>
							<p>{ i18n.translate( 'All .blog domains with three characters or less are reserved by KKWT, the company that runs the .blog domain extension. Some short domains have been released (such as get.blog), but they are not available for public registration.' ) }</p>
							<p>{ i18n.translate( 'KKWT may make short domains available in the future. For now, .blog domains with three characters or less will be unavailable to register.' ) }</p>
						</div>
					</div>
				</div>

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
			</SunriseStep>
		);
	}
}

LearnMore.propTypes = {
	addNotice: PropTypes.func.isRequired,
	asyncValidating: PropTypes.bool.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	invalid: PropTypes.bool.isRequired,
	resetForm: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired
};

export default withStyles( styles )( bindHandlers( LearnMore ) );
