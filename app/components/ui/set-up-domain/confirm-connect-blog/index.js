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
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import { getServiceName } from 'lib/services';

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

		if ( service === 'wpcom' ) {
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
		const serviceName = getServiceName( service );

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1 className={ styles.setupCompleteHeader }>
						{ i18n.translate( 'Setup Complete!' ) }
					</h1>
					<ProgressBar progress={ 100 } />
				</SunriseStep.Header>

				<Form onSubmit={ this.handleSubmit }>
					{ blogType === 'existing' && (
						<Form.FieldArea>
							<h3>
								{ i18n.translate( 'Your domain is all set!' ) }
							</h3>

							<p>
								{ i18n.translate( 'We just made some changes for you so %(domainName)s will point to %(hostName)s.', {
									args: { hostName, domainName },
									components: { strong: <strong /> }
								} ) }
							</p>

							<Button className={ styles.button }>
								{ i18n.translate( 'Go to my %(serviceName)s blog', {
									args: { serviceName },
									comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
								} ) }
							</Button>
						</Form.FieldArea>
					) }

					{ blogType === 'new' && (
						<Form.FieldArea>
							<h3>
								{ i18n.translate( 'Your domain is ready for %(serviceName)s!', {
									args: { serviceName },
									comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
								} ) }
							</h3>

							<p>
								{ preventWidows( i18n.translate( 'Continue to %(serviceName)s to start building your new blog. After you create your blog with %(serviceName)s it will be available at %(domainName)s', {
									args: { serviceName, domainName },
									comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
								} ), 2 ) }
							</p>

							<Button className={ styles.button }>
								{ i18n.translate( 'Create my %(serviceName)s blog', {
									args: { serviceName },
									comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
								} ) }
							</Button>
						</Form.FieldArea>
					) }
				</Form>

				<SunriseStep.Footer>
					<Link to={ getPath( 'myDomains' ) }>
						{ i18n.translate( 'Back to My Domains' ) }
					</Link>
				</SunriseStep.Footer>
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
