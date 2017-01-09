// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import Form from 'components/ui/form';
import Header from 'components/ui/connect-user/header';
import Input from 'components/ui/form/input';
import i18n from 'i18n-calypso';
import ResendSignupEmail from './resend-signup-email';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';

const VerifyUser = React.createClass( {
	propTypes: {
		addNotice: PropTypes.func.isRequired,
		connectUser: PropTypes.func.isRequired,
		connectUserComplete: PropTypes.func.isRequired,
		domain: PropTypes.object,
		errors: PropTypes.object,
		fetchDomainPrice: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		hasSelectedDomain: PropTypes.bool.isRequired,
		invalid: PropTypes.bool.isRequired,
		isConfirmationCodeVisible: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		query: PropTypes.object,
		recordPageView: PropTypes.func.isRequired,
		redirect: PropTypes.func.isRequired,
		redirectToQueryParamUrl: PropTypes.func.isRequired,
		redirectToTryWithDifferentEmail: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		showToggle: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		updateCode: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		verifyUser: PropTypes.func.isRequired
	},

	componentDidMount() {
		const { query } = this.props;

		if ( this.props.isLoggedIn ) {
			return this.goToNextPage();
		}

		if ( this.props.user.data.twoFactorAuthenticationEnabled || this.isUsingCodeFromQuery() ) {
			// initializing this field causes the validate method to validate it
			this.initializeTwoFactorAuthenticationField();
		}

		if ( this.isUsingCodeFromQuery() ) {
			// the sign-in email directs the user to this component only if two factor authentication is enabled
			this.props.connectUserComplete( Object.assign( {}, query, { twoFactorAuthenticationEnabled: true } ) );
			this.props.showToggle( 'isConfirmationCodeVisible' );
			this.props.updateCode( query.code );
		} else if ( this.props.isLoggedIn ) {
			this.props.redirect( 'home' );

			return;
		} else if ( ! this.props.user.wasCreated ) {
			this.props.redirect( 'signupUser' );

			return;
		}

		this.props.recordPageView();
	},

	ensureSelectedDomain() {
		if ( this.props.hasSelectedDomain ) {
			return Promise.resolve();
		}
		const { query: { domain } } = this.props;
		return this.props.fetchDomainPrice( domain ).then( action => {
			this.props.selectDomain( action.result );
		} );
	},

	goToNextPage() {
		return this.ensureSelectedDomain().then( () => {
			if ( this.props.query.redirect_to ) {
				this.props.redirectToQueryParamUrl();
			} else {
				this.props.redirect( 'myDomains' );
			}
		} );
	},

	initializeTwoFactorAuthenticationField() {
		this.props.fields.twoFactorAuthenticationCode.onChange( '' );
	},

	isUsingCodeFromQuery() {
		const { query } = this.props;

		if ( ! query ) {
			return false;
		}

		return query.code && query.email && query.intention;
	},

	isSubmitButtonDisabled() {
		const { invalid, submitting, user: { isRequesting } } = this.props;

		return invalid || submitting || isRequesting;
	},

	handleConfirmationCodeLinkClick( event ) {
		event.preventDefault();

		this.props.showToggle( 'isConfirmationCodeVisible' );
	},

	handleSubmit() {
		const { fields, user: { data: { email }, intention } } = this.props;

		return this.verifyUser(
			email,
			fields.code.value,
			fields.twoFactorAuthenticationCode.value,
			intention
		).then( () => this.goToNextPage() );
	},

	verifyUser( email, code, twoFactorAuthenticationCode, intention ) {
		return this.props.verifyUser(
			email,
			code,
			twoFactorAuthenticationCode,
			intention
		);
	},

	twoFactorFields() {
		const { fields, submitFailed, user } = this.props;

		if ( user.data.twoFactorAuthenticationEnabled ) {
			return (
				<div className={ styles.twoFactorFields }>
					<label>{ i18n.translate( 'WordPress.com two-step authentication code:' ) }</label>

					<Input
						field={ fields.twoFactorAuthenticationCode }
						autoFocus={ this.isUsingCodeFromQuery() }
						autoComplete="off"
						pattern="[0-9]*"
						type="tel"
						dir="ltr"
					/>

					<ValidationError field={ fields.twoFactorAuthenticationCode } submitFailed={ submitFailed } />

					<div className={ styles.twoFactorAuthenticationMessage }>
						<p>
							{ i18n.translate( 'We are using your WordPress.com account to speed things up.' ) }
						</p>
						<p>
							{ i18n.translate( 'Enter the confirmation code from your authenticator app or from the text ' +
							'message to proceed.' ) }
						</p>
					</div>
				</div>
			);
		}
	},

	render() {
		const { domain, errors, fields, handleSubmit, isConfirmationCodeVisible, submitFailed, user } = this.props;

		if ( ! user.intention ) {
			// Don't render until the state is populated with user data or in
			// the case that we redirect
			return null;
		}

		return (
			<div>
				<Header intention={ 'verifyUser' } />

				<Form
					onSubmit={ handleSubmit( this.handleSubmit ) }
					errors={ errors }
					focusOnError
					className={ styles.checkEmail }
				>
					<Form.FieldArea errors={ errors } focusOnError className={ styles.confirmContent }>
						<fieldset>
							<div className={ styles.instructions }>
								<p>{ i18n.translate( 'Using another device or the link doesn\'t work?' ) }</p>
								{ ! isConfirmationCodeVisible && (
									<div className={ styles.confirmationCodeLinkContainer }>
										<a
											className={ styles.confirmationCodeLink }
											href="#"
											onClick={ this.handleConfirmationCodeLinkClick }
										>
											{ i18n.translate( 'Enter the confirmation code' ) }
										</a>
									</div>
								) }
							</div>

							{ isConfirmationCodeVisible && (
								<div>
									<label>{ i18n.translate( 'Confirmation code:' ) }</label>

									<Input
										field={ fields.code }
										autoFocus={ ! this.isUsingCodeFromQuery() }
										autoComplete="off"
										pattern="[0-9]*"
										type="tel"
										dir="ltr"
									/>

									<ValidationError field={ fields.code } submitFailed={ submitFailed } />

									{ this.twoFactorFields() }
								</div>
							) }
						</fieldset>
					</Form.FieldArea>

					<Form.SubmitArea className={ styles.submitArea }>
						{ isConfirmationCodeVisible && (
							<Button
								className={ styles.button }
								disabled={ this.isSubmitButtonDisabled() }
							>
								{ user.intention === 'login'
									? i18n.translate( 'Next' )
									: i18n.translate( 'Verify my email' )
								}
							</Button>
						) }

						<ResendSignupEmail
							connectUser={ this.props.connectUser }
							redirectToTryWithDifferentEmail={ this.props.redirectToTryWithDifferentEmail }
							email={ user.data.email }
							intention={ user.intention }
							domain={ this.props.hasSelectedDomain ? domain.domainName : null }
						/>
					</Form.SubmitArea>
				</Form>
			</div>
		);
	}
} );

export default withStyles( styles )( VerifyUser );
