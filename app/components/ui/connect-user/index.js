// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import Form from 'components/ui/form';
import Header from 'components/ui/connect-user/header';

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
		return this.props.connectUser( this.props.values, this.props.domain.domainName );
	},

	renderTermsOfService() {
		const { intention } = this.props;
		if ( intention === 'signup' ) {
			return (
				<section className={ styles.terms }>
					{ i18n.translate( 'By clicking Next, you understand that you will get a WordPress.com account as a part of signing up at get.blog, and agree to these ' +
					'{{link}}Terms of Service{{/link}}.',
						{
							components: { link: <a href="https://wordpress.com/tos/" target="_blank" rel="noopener noreferrer" /> }
						}
					) }
				</section>
			);
		}
	},

	renderPoweredBy() {
		const { intention } = this.props;
		if ( intention === 'signup' ) {
			return (
				<div className={ styles.poweredBy }>
					<h3 className={ styles.headline }>
						{ i18n.translate( 'Proudly powered by WordPress.com' ) }
					</h3>
					<p>
						{ i18n.translate( 'Your get.blog domain can easily be connected to a WordPress.com blog.' ) }
					</p>
				</div>
			);
		}
	},

	renderNoAccountMessage() {
		const { intention } = this.props;

		if ( intention !== 'signup' ) {
			return;
		}

		return (
			<Form.Footer>
				<p>
					{ i18n.translate( 'Find a .blog you love on {{link}}WordPress.com{{/link}}.', {
						components: { link: <a href={ config( 'new_search_url' ) } rel="noopener noreferrer" /> }
					} ) }
				</p>
			</Form.Footer>
		);
	},

	renderContactSupport() {
		const { intention } = this.props;

		if ( intention !== 'login' ) {
			return;
		}

		return (
			<Form.Footer>
				<p>
					{ i18n.translate(
						'For any questions, please contact us at {{link}}help@wordpress.com{{/link}}.',
						{
							components: { link: <a href={ config( 'support_link' ) } rel="noopener noreferrer" /> }
						}
					) }
				</p>
			</Form.Footer>
		);
	},

	render() {
		const { handleSubmit, intention, domain: { domainName } } = this.props;

		return (
			<DocumentTitle title={ intention === 'login' ? i18n.translate( 'Log In' ) : i18n.translate( 'Sign Up' ) }>
				<div>
					<Header intention={ intention } domainName={ domainName } />

					<Form onSubmit={ handleSubmit( this.handleSubmit ) } className={ styles.loginForm }>
						<Form.FieldArea>
							<div>
								<fieldset>
									<label className={ styles.emailLabel }>
										{ i18n.translate( 'We have merged the ease of use of get.blog with the power of WordPress.com. ' ) }
									</label>
									<label>
										{ i18n.translate( 'Get.blog domains are now managed at WordPress.com. If you purchased a domain on get.blog, ' +
											'we sent you an email with instructions to log in and manage your domains on WordPress.com. ' +
											'Check your email for more information or ' +
											'visit WordPress.com now to {{link}}create your password{{/link}}.', {
												components: { link: <a href="https://wordpress.com/wp-login.php?action=lostpassword" rel="noopener noreferrer" /> }
											}
										) }
									</label>
								</fieldset>
							</div>
						</Form.FieldArea>
						{ this.renderContactSupport() }
						{ this.renderNoAccountMessage() }
					</Form>

				</div>
			</DocumentTitle>
		);
	}
} );

export default withStyles( styles )( ConnectUser );
