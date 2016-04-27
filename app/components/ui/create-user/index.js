// External dependencies
import React from 'react';

// Internal dependencies
import i18n from 'lib/i18n';

const CreateUser = React.createClass( {
	componentWillReceiveProps( nextProps ) {
		if ( ! this.props.user.wasCreated && nextProps.user.wasCreated ) {
			this.props.redirectToVerifyUser();
		}
	},

	render() {
		const { handleSubmit, fields, user } = this.props;

		return (
			<form onSubmit={ handleSubmit }>
				<div>
					<label>{ i18n.translate( 'Email address:' ) }</label>
					<input { ...fields.email } />
				</div>
				<div>
					<button disabled={ user.isUpdating }>{ i18n.translate( 'Next' ) }</button>
				</div>
			</form>
		);
	}
} );

export default CreateUser;
