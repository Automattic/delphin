// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import classnames from 'classnames';
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
import { getServiceName } from 'lib/services';
import withPageView from 'lib/analytics/with-page-view';

class ConfirmConnectBlog extends Component {
	handleSubmit( event ) {
		event.preventDefault();

		const { blogType, recordTracksEvent, domainName, hostName, service } = this.props;

		recordTracksEvent( 'delphin_connect_success_click', { host: service } );

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
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.headerContainer }>
					<div className={ styles.header }>
						<h1 className={ classnames( styles.headerText, styles.setupCompleteHeader ) }>
							{ i18n.translate( 'Setup Complete!' ) }
						</h1>
						<ProgressBar progress={ 100 } />
					</div>
				</div>

				<Form onSubmit={ this.handleSubmit }>
					{ blogType === 'existing' && (
						<Form.FieldArea>
							<h3>
								{ i18n.translate( 'Your domain is all set!' ) }
							</h3>

							<p>
								{ i18n.translate( '%(domainName)s now points to %(hostName)s.', {
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
								{ preventWidows( i18n.translate( 'Continue to %(serviceName)s to start building your new blog. It will be available at %(domainName)s.', {
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

				<div className={ styles.footer }>
					<Link to={ getPath( 'myDomains' ) }>
						{ i18n.translate( 'Back to My Domains' ) }
					</Link>
				</div>

			</div>
		);
	}
}

ConfirmConnectBlog.propTypes = {
	blogType: PropTypes.string.isRequired,
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string,
	logInToWpcom: PropTypes.func.isRequired,
	recordTracksEvent: PropTypes.func.isRequired,
	service: PropTypes.string.isRequired,
};

export default withStyles( styles )( withPageView( bindHandlers( ConfirmConnectBlog ), 'Confirm Connect Blog' ) );
