// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import Footer from 'components/ui/connect-user/footer';
import Form from 'components/ui/form';
import Header from 'components/ui/connect-user/header';
import i18n from 'i18n-calypso';
import Input from 'components/ui/form/input';
import ResendSignupEmail from './resend-signup-email';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';

const VerifyUser = React.createClass( {
	propTypes: {
		addNotice: PropTypes.func.isRequired,
		connectUser: PropTypes.func.isRequired,
		connectUserComplete: PropTypes.func.isRequired,
		domain: PropTypes.string,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		redirect: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		updateCode: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		userDataFromQuery: PropTypes.object,
		verifyUser: PropTypes.func.isRequired
	},

	componentDidMount() {
		const { userDataFromQuery } = this.props;

		this.props.connectUserComplete( userDataFromQuery );

		if ( this.isLoggingInWithQuery() && userDataFromQuery.twoFactorAuthenticationEnabled ) {
			this.props.updateCode( userDataFromQuery.code );
			return;
		}

		if ( this.isLoggingInWithQuery() && ! userDataFromQuery.twoFactorAuthenticationEnabled ) {
			this.verifyUser(
				userDataFromQuery.email,
				userDataFromQuery.code,
				null,
				userDataFromQuery.intention
			);
			return;
		}

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

	isLoggingInWithQuery() {
		const { userDataFromQuery } = this.props;

		if ( ! userDataFromQuery ) {
			return false;
		}

		const { code, email, intention } = userDataFromQuery;

		return code && email && intention;
	},

	isSubmitButtonDisabled() {
		const { invalid, submitting, user: { isRequesting } } = this.props;

		return invalid || submitting || isRequesting;
	},

	handleSubmit() {
		const { fields, user: { data: { email }, intention } } = this.props;

		return this.verifyUser(
			email,
			fields.code.value,
			fields.twoFactorAuthenticationCode.value,
			intention
		);
	},

	verifyUser( email, code, twoFactorAuthenticationCode, intention ) {
		return this.props.verifyUser(
			email,
			code,
			twoFactorAuthenticationCode,
			intention
		).then( () => {
			this.props.addNotice( {
				message: i18n.translate( 'You have signed in to your account successfully!' ),
				status: 'success'
			} );
		} ).catch( error => {
			if ( intention === 'login' ) {
				this.props.redirect( 'loginUser' );
			}

			if ( intention === 'signup' ) {
				this.props.redirect( 'signupUser' );
			}

			this.props.addNotice( {
				message: error.code || i18n.translate( 'There was a problem signing in to your account.' ),
				status: 'error'
			} );
		} );
	},

	twoFactorFields() {
		const { fields, submitFailed, user } = this.props;

		if ( user.data.twoFactorAuthenticationEnabled ) {
			return (
				<div className={ styles.twoFactorFields }>
					<label>{ i18n.translate( 'Two factor authentication code:' ) }</label>

					<Input
						field={ fields.twoFactorAuthenticationCode }
						autoFocus={ this.isLoggingInWithQuery() }
						autoComplete="off"
					/>

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
		const { fields, handleSubmit, submitFailed, user, userDataFromQuery } = this.props;

		if ( ! user.intention ) {
			// Don't render until the state is populated with user data or in
			// the case that we redirect
			return null;
		}

		if ( this.isLoggingInWithQuery() && ! userDataFromQuery.twoFactorAuthenticationEnabled ) {
			return (
				<div className={ styles.loggingIn }>
					{ userDataFromQuery.intention === 'login' && i18n.translate( 'Signing you in…' ) }
					{ userDataFromQuery.intention === 'signup' && i18n.translate( 'Signing you in to your new account now…' ) }
				</div>
			);
		}

		return (
			<div>
				<Header intention={ 'verifyUser' } />

				<Form
					onSubmit={ handleSubmit( this.handleSubmit ) }
					noticeArea={ this.renderNotice() }
					fieldArea={
						<fieldset>
							<label>{ i18n.translate( 'Confirmation code:' ) }</label>

							<Input
								field={ fields.code }
								autoFocus={ ! this.isLoggingInWithQuery() }
								autoComplete="off"
							/>

							<ValidationError field={ fields.code } submitFailed={ submitFailed } />

							<ResendSignupEmail
								connectUser={ this.props.connectUser }
								email={ user.data.email }
								intention={ user.intention } />

							{ this.twoFactorFields() }
						</fieldset>
					}
					submitArea={
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ user.intention === 'login'
								? i18n.translate( 'Login' )
								: i18n.translate( 'Verify my email' )
							}
						</Button>
					} />

				<Footer />
			</div>
		);
	}
} );

export default withStyles( styles )( VerifyUser );
