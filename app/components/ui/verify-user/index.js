// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import Form from 'components/ui/form';
import i18n from 'lib/i18n';
import ResendSignupEmail from './resend-signup-email';

const VerifyUser = React.createClass( {
	propTypes: {
		createUserWithoutPassword: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToNewUser: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired,
		verifyUser: PropTypes.func.isRequired
	},

	componentDidMount() {
		if ( ! this.props.user.data.email ) {
			this.props.redirectToNewUser();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.user.isLoggedIn ) {
			this.props.redirectToSearch();
		}
	},

	verifyUser() {
		this.props.verifyUser( this.props.user.data.email, this.props.fields.code.value );
	},

	render() {
		const { fields, handleSubmit, user } = this.props;

		return (
			<Form
				onSubmit={ handleSubmit( this.verifyUser ) }
				noticeArea={
					i18n.translate(
						'We just sent a confirmation code to {{strong}}%(email)s{{/strong}}. ' +
						'Type that code below to verify your email address.',
						{
							args: { email: user.data.email },
							components: { strong: <strong /> }
						}
					)
				}
				fieldArea={
					<fieldset>
						<label>{ i18n.translate( 'Confirmation code:' ) }</label>

						<input { ...fields.code } autoFocus />

						<ResendSignupEmail
							createUserWithoutPassword={ this.props.createUserWithoutPassword }
							email={ this.props.user.data.email } />
					</fieldset>
				}
				submitArea={
					<button disabled={ user.isUpdating }>
						{ i18n.translate( 'Verify my email' ) }
					</button>
				} />
		);
	}
} );

export default VerifyUser;
