// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

// Internal dependencies
import Footer from 'components/ui/connect-user/footer';
import Form from 'components/ui/form';
import Header from 'components/ui/connect-user/header';
import ValidationError from 'components/ui/form/validation-error';

const ConnectUser = React.createClass( {
	propTypes: {
		clearConnectUser: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		intention: PropTypes.string.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		redirectToVerifyUser: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	},

	componentDidMount() {
		if ( this.props.user.isLoggedIn ) {
			this.props.redirectToHome();
		} else {
			this.props.clearConnectUser();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.user.isLoggedIn ) {
			this.props.redirectToHome();
		}

		if ( ! this.props.user.wasCreated && nextProps.user.wasCreated ) {
			this.props.redirectToVerifyUser();
		}
	},

	render() {
		const { handleSubmit, fields, user } = this.props;

		return (
			<div>
				<Header intention={ this.props.intention } />

				<Form
					onSubmit={ handleSubmit }
					fieldArea={
						<fieldset>
							<label>{ i18n.translate( 'Email address:' ) }</label>
							<input { ...fields.email } autoFocus />
							<ValidationError field={ fields.email } />
						</fieldset>
					}
					submitArea={
						<button disabled={ user.isRequesting }>
							{ i18n.translate( 'Next' ) }
						</button>
					} />

				<Footer />
			</div>
		);
	}
} );

export default ConnectUser;
