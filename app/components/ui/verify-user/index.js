// External dependencies
import React from 'react';

// Internal dependencies
import Form from 'components/ui/form';
import i18n from 'lib/i18n';

const VerifyUser = React.createClass( {
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
