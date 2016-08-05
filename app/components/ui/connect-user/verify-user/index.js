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
		domain: PropTypes.object,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		hasSelectedDomain: PropTypes.bool.isRequired,
		invalid: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		query: PropTypes.object,
		recordPageView: PropTypes.func.isRequired,
		redirect: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		updateCode: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		verifyUser: PropTypes.func.isRequired
	},

	componentDidMount() {
		const { query } = this.props;

		if ( this.props.isLoggedIn ) {
			this.props.redirect( 'home' );

			return;
		} else if ( ! this.props.user.wasCreated ) {
			this.props.redirect( 'signupUser' );

			return;
		}

		if ( this.isUsingCodeFromQuery() ) {
			if ( query.domain ) {
				this.props.selectDomain( { domain_name: query.domain } );
			}

			this.props.connectUserComplete( Object.assign( {}, query, { twoFactorAuthenticationEnabled: true } ) );
			this.props.updateCode( query.code );
		}

		this.props.recordPageView();
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isLoggedIn ) {
			if ( nextProps.hasSelectedDomain ) {
				this.props.redirect( 'contactInformation' );
			} else {
				this.props.redirect( 'home' );
			}
		}
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
		).catch( () => {
			return Promise.reject( {
				code: i18n.translate( 'Enter your code just as it is in the email.' )
			} );
		} );
	},

	twoFactorFields() {
		const { fields, submitFailed, user } = this.props;

		if ( user.data.twoFactorAuthenticationEnabled ) {
			return (
				<div className={ styles.twoFactorFields }>
					<label>{ i18n.translate( 'Two-step authentication code:' ) }</label>

					<Input
						field={ fields.twoFactorAuthenticationCode }
						autoFocus={ this.isUsingCodeFromQuery() }
						autoComplete="off"
					/>

					<ValidationError field={ fields.twoFactorAuthenticationCode } submitFailed={ submitFailed } />
				</div>
			);
		}
	},

	renderNotice() {
		const { user: { data: { notice } } } = this.props;

		if ( notice ) {
			return notice;
		}

		let text = i18n.translate( 'Using another device or the link doesn\'t work? Enter the confirmation code from the email.' );

		return text;
	},

	render() {
		const { domain, fields, handleSubmit, submitFailed, user } = this.props;

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
					noticeArea={ this.renderNotice() }
					fieldArea={
						<fieldset>
							<label>{ i18n.translate( 'Confirmation code:' ) }</label>

							<Input
								field={ fields.code }
								autoFocus={ ! this.isUsingCodeFromQuery() }
								autoComplete="off"
							/>

							<ValidationError field={ fields.code } submitFailed={ submitFailed } />

							<ResendSignupEmail
								connectUser={ this.props.connectUser }
								email={ user.data.email }
								intention={ user.intention }
								domain={ this.props.hasSelectedDomain ? domain.domainName : null }
							/>

							{ this.twoFactorFields() }
						</fieldset>
					}
					submitArea={
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ user.intention === 'login'
								? i18n.translate( 'Next' )
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
