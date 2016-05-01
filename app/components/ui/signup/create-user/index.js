// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import Footer from 'components/ui/signup/footer';
import Form from 'components/ui/form';
import i18n from 'lib/i18n';

const CreateUser = React.createClass( {
	propTypes: {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToVerifyUser: PropTypes.func.isRequired,
		removeUser: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	},

	componentDidMount() {
		if ( this.props.user.isLoggedIn ) {
			this.props.redirectToSearch();
		} else {
			this.props.removeUser();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! this.props.user.wasCreated && nextProps.user.wasCreated ) {
			this.props.redirectToVerifyUser();
		}
	},

	render() {
		const { handleSubmit, fields, user } = this.props,
			emailValidationError = fields.email.touched && fields.email.error;

		return (
			<div>
				<Form
					onSubmit={ handleSubmit }
					fieldArea={
						<fieldset>
							<label>{ i18n.translate( 'Email address:' ) }</label>
							<input { ...fields.email } autoFocus />
							{ emailValidationError && <div className={ styles.validationError }>{ fields.email.error }</div> }
						</fieldset>
					}
					submitArea={
						<button disabled={ user.isUpdating }>
							{ i18n.translate( 'Next' ) }
						</button>
					} />

				<Footer />
			</div>
		);
	}
} );

export default CreateUser;
