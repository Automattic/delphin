// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import { getPath } from 'routes';
import { preventWidows } from 'lib/formatters';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class ConfirmConnectBlog extends Component {
	handleSubmit( event ) {
		event.preventDefault();

		this.props.logInToWpcom();
	}

	render() {
		const { blogType, domainName, hostName } = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>
						{ blogType === 'existing' &&
							i18n.translate( 'Your new domain is connected!' )
						}

						{ blogType === 'new' &&
							i18n.translate( 'Set up your blog at WordPress.com' )
						}
					</h1>
				</SunriseStep.Header>

				<Form onSubmit={ this.handleSubmit }>
					{ blogType === 'existing' && (
						<Form.FieldArea>
							<p>
								{ preventWidows( i18n.translate( "You're all set! We just made some changes for you so %(domainName)s will point to %(hostName)s.", {
									args: { hostName, domainName },
									components: { strong: <strong /> }
								} ), 2 ) }
							</p>

							<p>
								{ preventWidows( i18n.translate( "Just a reminder you won't see the changes right away. It can take up to 72 hours for settings to be updated across the web." ), 2 ) }
							</p>

							<Button className={ styles.button }>
								{ i18n.translate( 'Go to my WordPress.com blog' ) }
							</Button>
						</Form.FieldArea>
					) }

					{ blogType === 'new' && (
						<Form.FieldArea>
							<p>
								{ preventWidows( i18n.translate( "You're all set! Just sign up at WordPress.com and create your new blog." ), 2 ) }
							</p>

							<p>
								{ preventWidows( i18n.translate( 'To get started, sign up at WordPress.com and create a new blog. Your domain will connect automatically.' ), 2 ) }
							</p>

							<Button className={ styles.button }>
								{ i18n.translate( 'Sign up at WordPress.com' ) }
							</Button>
						</Form.FieldArea>
					) }

					<Form.SubmitArea>
						<Link to={ getPath( 'myDomains' ) }>
							{ i18n.translate( 'Back to My Domains' ) }
						</Link>
					</Form.SubmitArea>
				</Form>
			</SunriseStep>
		);
	}
}

ConfirmConnectBlog.propTypes = {
	blogType: PropTypes.string.isRequired,
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string,
	logInToWpcom: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( ConfirmConnectBlog ) );
