// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import Footer from 'components/ui/connect-user/footer';
import Form from 'components/ui/form';
import Header from 'components/ui/connect-user/header';
import Input from 'components/ui/form/input';
import ValidationError from 'components/ui/form/validation-error';

const ConnectUser = React.createClass( {
	propTypes: {
		clearConnectUser: PropTypes.func.isRequired,
		connectUser: PropTypes.func.isRequired,
		domain: PropTypes.object,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		hasSelectedDomain: PropTypes.bool.isRequired,
		intention: PropTypes.string.isRequired,
		invalid: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		recordPageView: PropTypes.func.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		redirectToVerifyUser: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		submitting: PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired,
		values: PropTypes.object.isRequired
	},

	componentDidMount() {
		if ( this.props.isLoggedIn || ! this.props.hasSelectedDomain ) {
			this.props.redirectToHome();

			return;
		}

		this.props.clearConnectUser();
		this.props.recordPageView();
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isLoggedIn ) {
			this.props.redirectToHome();
		} else if ( ! this.props.user.wasCreated && nextProps.user.wasCreated ) {
			this.props.redirectToVerifyUser();
		}
	},

	isSubmitButtonDisabled() {
		const { invalid, submitting, user: { isRequesting } } = this.props;

		return invalid || submitting || isRequesting;
	},

	handleSubmit() {
		this.props.connectUser( this.props.values, this.props.domain.domainName );
	},

	render() {
		const { fields, handleSubmit, intention, submitFailed } = this.props;

		return (
			<DocumentTitle title={ intention === 'login' ? i18n.translate( 'Login' ) : i18n.translate( 'Signup' ) }>
				<div>
					<Header intention={ intention } />

					<Form
						onSubmit={ handleSubmit( this.handleSubmit ) }
						fieldArea={
							<fieldset>
								<label>{ i18n.translate( 'Email address:' ) }</label>
								<Input field={ fields.email } autoFocus />
								<ValidationError field={ fields.email } submitFailed={ submitFailed } />
							</fieldset>
						}
						submitArea={
							<Button disabled={ this.isSubmitButtonDisabled() }>
								{ i18n.translate( 'Next' ) }
							</Button>
						} />

					<Footer />
				</div>
			</DocumentTitle>
		);
	}
} );

export default ConnectUser;
