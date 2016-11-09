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
import DomainInput from 'components/ui/form/domain-input';
import Email from 'components/ui/form/email';
import { subscribeUser } from 'actions/learn-more';
import ValidationError from 'components/ui/form/validation-error';
import { withTld } from 'lib/domains';

class LearnMore extends React.Component {
	handleSubscribeUser() {
		const { addNotice, fields: { email, domain }, resetForm } = this.props;

		return subscribeUser( email.value, withTld( domain.value ) ).then( ( { result, msg } ) => {
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
				<DocumentTitle title={ i18n.translate( 'Get .blog updates in your email' ) } />
				<SunriseStep.Header className={ styles.container }>
					<h1 className={ styles.heading }>{ i18n.translate( 'Get .blog updates in your email' ) }</h1>
					<div className={ styles.text }>
						{
							i18n.translate( 'Sign up to receive updates about .blog and be the first to hear when it launches on November 21.' )
						}
					</div>
				</SunriseStep.Header>
				<div className={ styles.formContainer }>
					<form className={ styles.form } noValidate onSubmit={ handleSubmit( this.handleSubscribeUser ) }>
						<div className={ styles.inputContainer }>
							<DomainInput
								inputClassName={ styles.input }
								field={ fields.domain }
								gridIconSize={ 32 }
								placeholder={ i18n.translate( 'What domain are you interested in?' ) }
							/>
							<ValidationError field={ fields.domain } />
						</div>

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
