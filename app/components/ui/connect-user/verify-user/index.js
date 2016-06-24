// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import Footer from 'components/ui/connect-user/footer';
import Form from 'components/ui/form';
import Header from 'components/ui/connect-user/header';
import i18n from 'i18n-calypso';
import ResendSignupEmail from './resend-signup-email';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';

const VerifyUser = React.createClass( {
	propTypes: {
		connectUser: PropTypes.func.isRequired,
		domain: PropTypes.string,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		redirect: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired,
		verifyUser: PropTypes.func.isRequired
	},

	componentDidMount() {
		if ( this.props.isLoggedIn ) {
			this.props.redirect( 'home' );
		} else if ( ! this.props.user.wasCreated ) {
			this.props.redirect( 'signupUser' );
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isLoggedIn ) {
			if ( nextProps.domain ) {
				this.props.redirect( 'contactInformation' );
			} else {
				this.props.redirect( 'home' );
			}
		}
	},

	isSubmitButtonDisabled() {
		const { invalid, submitting, user: { isRequesting } } = this.props;

		return invalid || submitting || isRequesting;
	},

	verifyUser() {
		return this.props.verifyUser(
			this.props.user.data.email,
			this.props.fields.code.value,
			this.props.fields.twoFactorAuthenticationCode.value,
			{ showSuccessNotice: this.props.user.intention === 'login' }
		);
	},

	twoFactorFields() {
		const { fields, submitFailed, user } = this.props;

		if ( user.data.twoFactorAuthenticationEnabled ) {
			return (
				<div className={ styles.twoFactorFields }>
					<label>{ i18n.translate( 'Two factor authentication code:' ) }</label>

					<input { ...fields.twoFactorAuthenticationCode } autoComplete="off" />

					<ValidationError field={ fields.twoFactorAuthenticationCode } submitFailed={ submitFailed } />
				</div>
			);
		}
	},

	renderNotice() {
		const { user: { data: { email, notice }, intention } } = this.props;

		if ( notice ) {
			return notice;
		}

		let text = i18n.translate(
			'We just sent a confirmation code to {{strong}}%(email)s{{/strong}}.',
			{
				args: { email: email },
				components: { strong: <strong /> }
			}
		);

		if ( intention === 'login' ) {
			return (
				<p>
					{ text }
					{ ' ' }
					{ i18n.translate( 'Type that code below to login.' ) }
				</p>
			);
		} else if ( intention === 'signup' ) {
			return (
				<p>
					{ text }
					{ ' ' }
					{ i18n.translate( 'Type that code below to verify your email address.' ) }
				</p>
			);
		}

		return text;
	},

	render() {
		const { fields, handleSubmit, submitFailed, user } = this.props;

		return (
			<div>
				<Header intention={ 'verifyUser' } />

				<Form
					onSubmit={ handleSubmit( this.verifyUser ) }
					noticeArea={ this.renderNotice() }
					fieldArea={
						<fieldset>
							<label>{ i18n.translate( 'Confirmation code:' ) }</label>

							<input { ...fields.code } autoFocus autoComplete="off" />

							<ValidationError field={ fields.code } submitFailed={ submitFailed } />

							<ResendSignupEmail
								connectUser={ this.props.connectUser }
								email={ user.data.email }
								intention={ user.intention } />

							{ this.twoFactorFields() }
						</fieldset>
					}
					submitArea={
						<button disabled={ this.isSubmitButtonDisabled() }>
							{ user.intention === 'login'
								? i18n.translate( 'Login' )
								: i18n.translate( 'Verify my email' )
							}
						</button>
					} />

				<Footer />
			</div>
		);
	}
} );

export default VerifyUser;
