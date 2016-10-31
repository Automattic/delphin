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

		const { blogType, domainName, hostName, service } = this.props;

		let destination;
		if ( service === 'pressable' ) {
			if ( blogType === 'new' ) {
				destination = 'https://my.pressable.com?domain=' + domainName + '&new_site=true';
			}

			if ( blogType === 'existing' ) {
				destination = 'https://my.pressable.com?domain=' + domainName + '&new_site=false';
			}

			window.open( destination, '_blank' );

			return;
		}

		if ( service === 'wordpressdotcom' ) {
			if ( blogType === 'new' ) {
				destination = 'https://wordpress.com/start/get-dot-blog?domain=' + domainName;
			}

			if ( blogType === 'existing' ) {
				destination = 'https://wordpress.com/checkout/' + hostName + '/domain-mapping:' + domainName;
			}

			this.props.logInToWpcom( destination );

			return;
		}

		throw new Error( 'This service is not supported' );
	}

	render() {
		const { blogType, domainName, hostName, service } = this.props;

		let serviceName;
		if ( service === 'wordpressdotcom' ) {
			serviceName = 'WordPress.com';
		}

		if ( service === 'pressable' ) {
			serviceName = 'Pressable';
		}

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1 className={ styles.setupCompleteHeader }>
						{ i18n.translate( 'Setup Complete!' ) }
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
								{ i18n.translate( 'Go to my %(serviceName)s blog', {
									args: { serviceName }
								} ) }
							</Button>
						</Form.FieldArea>
					) }

					{ blogType === 'new' && (
						<Form.FieldArea>
							<p>
								{ preventWidows( i18n.translate( "You're all set! Just sign up at %(serviceName)s and create your new blog.", {
									args: { serviceName }
								} ), 2 ) }
							</p>

							<p>
								{ preventWidows( i18n.translate( 'To get started, sign up at %(serviceName)s and create a new blog. Your domain will connect automatically.', {
									args: { serviceName }
								} ), 2 ) }
							</p>

							<Button className={ styles.button }>
								{ i18n.translate( 'Sign up at %(serviceName)s', {
									args: { serviceName }
								} ) }
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
	service: PropTypes.string.isRequired,
};

export default withStyles( styles )( bindHandlers( ConfirmConnectBlog ) );
