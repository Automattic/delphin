// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
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
			destination = 'https://my.pressable.com/signup/five-sites?domain=' + domainName + '&new_site=';

			if ( blogType === 'new' ) {
				destination += 'true';
			} else if ( blogType === 'existing' ) {
				destination += 'false';
			} else {
				throw new Error( "Unable to connect domain to Pressable because of missing destination for blog type '" + blogType + "'" );
			}

			window.open( destination, '_blank' );
		} else if ( service === 'wpcom' ) {
			if ( blogType === 'new' ) {
				destination = 'https://wordpress.com/start/get-dot-blog?domain=' + domainName;
			} else if ( blogType === 'existing' ) {
				destination = 'https://wordpress.com/checkout/' + hostName + '/domain-mapping:' + domainName;
			} else {
				throw new Error( "Unable to connect domain to WordPress.com because of missing destination for blog type '" + blogType + "'" );
			}

			this.props.logInToWpcom( destination );
		} else {
			throw new Error( "Unable to connect domain to host because of unsupported service '" + service + "'" );
		}
	}

	render() {
		const { blogType, domainName, service } = this.props;
		const serviceName = getServiceName( service );

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.headerContainer }>
					<div className={ styles.header }>
						<h1 className={ classnames( styles.headerText ) }>
							<span className={ styles.setUpLabel }>
								{ i18n.translate( 'Setup: ' ) }
							</span>

							{ i18n.translate( 'Proceed to %(serviceName)s.', {
								args: { serviceName },
								comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
							} ) }
						</h1>
						<ProgressBar progress={ 90 } />
					</div>
				</div>

				<Form onSubmit={ this.handleSubmit }>
					{ blogType === 'existing' && (
						<Form.FieldArea>
							<p>
								{ i18n.translate( "Your domain is almost ready, now it's time to set up your blog so it is available at %(domainName)s.", {
									args: { domainName }
								} ) }
							</p>

							<Button className={ styles.button }>
								{ i18n.translate( 'Set up my %(serviceName)s blog', {
									args: { serviceName },
									comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
								} ) }
							</Button>
						</Form.FieldArea>
					) }

					{ blogType === 'new' && (
						<Form.FieldArea>
							<p>
								{ preventWidows( i18n.translate( "Your domain is almost ready, now it's time to start building your new blog. It will be available at %(domainName)s.", {
									args: { domainName }
								} ), 2 ) }
							</p>

							<Button className={ styles.button }>
								{ i18n.translate( 'Start my %(serviceName)s blog', {
									args: { serviceName },
									comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
								} ) }
							</Button>
						</Form.FieldArea>
					) }
				</Form>
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
