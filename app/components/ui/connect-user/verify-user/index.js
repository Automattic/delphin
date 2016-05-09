// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import Footer from 'components/ui/connect-user/footer';
import Form from 'components/ui/form';
import i18n from 'lib/i18n';
import ResendSignupEmail from './resend-signup-email';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';

const VerifyUser = React.createClass( {
	propTypes: {
		connectUser: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToSignup: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		verifyUser: PropTypes.func.isRequired
	},

	componentDidMount() {
		if ( ! this.props.user.data.email ) {
			this.props.redirectToSignup();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.user.isLoggedIn ) {
			this.props.redirectToSearch();
		}
	},

	verifyUser() {
		return this.props.verifyUser(
			this.props.user.data.email,
			this.props.fields.code.value,
			this.props.fields.twoFactorAuthenticationCode.value
		);
	},

	twoFactorFields() {
		const { fields, user } = this.props;

		if ( user.data.twoFactorAuthenticationEnabled ) {
			return (
				<div className={ styles.twoFactorFields }>
					<label>{ i18n.translate( 'Two factor authentication code:' ) }</label>

					<input { ...fields.twoFactorAuthenticationCode } autoComplete="off" />

					<ValidationError field={ fields.twoFactorAuthenticationCode } />
				</div>
			);
		}
	},

	render() {
		const { fields, handleSubmit, user } = this.props,
			notice = user.data.notice || i18n.translate(
				'We just sent a confirmation code to {{strong}}%(email)s{{/strong}}. ' +
				'Type that code below to verify your email address.',
				{
					args: { email: user.data.email },
					components: { strong: <strong /> }
				}
			);

		return (
			<div>
				<Form
					onSubmit={ handleSubmit( this.verifyUser ) }
					noticeArea={ notice }
					fieldArea={
						<fieldset>
							<label>{ i18n.translate( 'Confirmation code:' ) }</label>

							<input { ...fields.code } autoFocus autoComplete="off" />

							<ValidationError field={ fields.code } />

							<ResendSignupEmail
								connectUser={ this.props.connectUser }
								email={ user.data.email }
								intention={ user.intention } />

							{ this.twoFactorFields() }
						</fieldset>
					}
					submitArea={
						<button disabled={ user.isRequesting }>
							{ i18n.translate( 'Verify my email' ) }
						</button>
					} />

					<Footer />
			</div>
		);
	}
} );

export default VerifyUser;
