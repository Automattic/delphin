// External dependencies
import React from 'react';

// Internal dependencies
import Form from 'components/ui/form';
import i18n from 'lib/i18n';

const VerifyUser = React.createClass( {
	verifyUser() {
		this.props.verifyUser( this.props.user.data.email, this.props.fields.code.value );
	},

	render() {
		const { fields, handleSubmit, user } = this.props;

		return (
			<Form
				onSubmit={ handleSubmit( this.verifyUser ) }
				fieldArea={
					<fieldset>
						<label>{ i18n.translate( 'Confirmation code:' ) }</label>
						<input { ...fields.code } />
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
