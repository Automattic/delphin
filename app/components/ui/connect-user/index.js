// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import Form from 'components/ui/form';
import Header from 'components/ui/connect-user/header';
import Input from 'components/ui/form/input';
import ValidationError from 'components/ui/form/validation-error';
import scrollToTop from 'components/containers/scroll-to-top';

const ConnectUser = React.createClass( {
	propTypes: {
		clearConnectUser: PropTypes.func.isRequired,
		connectUser: PropTypes.func.isRequired,
		displayError: PropTypes.func.isRequired,
		domain: PropTypes.object,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
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
		if ( this.props.isLoggedIn ) {
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

		return invalid || submitting || isRequesting || ! process.env.BROWSER;
	},

	handleSubmit() {
		this.props.connectUser( this.props.values, this.props.domain.domainName )
			.catch( () => this.props.displayError( i18n.translate( 'Something went wrong. Please try again.' ) ) );
	},

	renderTermsOfService() {
		return <section className={ styles.terms }>
			{ i18n.translate( 'By clicking “next”, you understand that you will get a WordPress.com account as a part of signing up for a .blog domain, and agree to these ' +
			'{{link}}Terms of Service{{/link}}.',
				{
					components: { link: <a href="https://wordpress.com/tos/" target="_blank" /> }
				}
			) }
		</section>;
	},

	render() {
		const { fields, handleSubmit, intention, submitFailed } = this.props;

		return (
			<DocumentTitle title={ intention === 'login' ? i18n.translate( 'Log In' ) : i18n.translate( 'Sign Up' ) }>
				<div>
					<Header intention={ intention } />

					<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
						<Form.FieldArea>
							<div>
								<fieldset>
									<label>{ i18n.translate( 'Email address:' ) }</label>
									<Input field={ fields.email } autoFocus type="email" dir="ltr" />
									<ValidationError field={ fields.email } submitFailed={ submitFailed } />
								</fieldset>
								{ this.renderTermsOfService() }
							</div>
						</Form.FieldArea>

						<Form.SubmitArea>
							<Button disabled={ this.isSubmitButtonDisabled() }>
								{ i18n.translate( 'Next' ) }
							</Button>
						</Form.SubmitArea>
						<div className={ styles.poweredBy }>
							<h3 className={ styles.headline }>Proudly powered by WordPress.com</h3>
							<p>Your get.blog domain can easily be connected to WordPress.</p>
						</div>
					</Form>

				</div>
			</DocumentTitle>
		);
	}
} );

export default scrollToTop( withStyles( styles )( ConnectUser ) );
