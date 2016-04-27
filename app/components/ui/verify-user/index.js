// External dependencies
import React from 'react';

// Internal dependencies
import i18n from 'lib/i18n';

const VerifyUser = React.createClass( {
	verifyUser() {
		this.props.verifyUser( this.props.user.data.email, this.props.fields.code.value );
	},

	render() {
		const { fields, handleSubmit, user } = this.props;

		return (
			<form onSubmit={ handleSubmit( this.verifyUser ) }>
				<div>
					<label>{ i18n.translate( 'Confirmation code:' ) }</label>
					<input { ...fields.code } />
				</div>
				<div>
					<button isDisabled={ user.isUpdating }>
						{ i18n.translate( 'Verify my email' ) }
					</button>
				</div>
			</form>
		);
	}
} );

export default VerifyUser;
