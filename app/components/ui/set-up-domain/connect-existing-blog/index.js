// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import noop from 'lodash/noop';
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';

class ConnectExistingBlog extends Component {
	handleSubmit( event ) {
		event.preventDefault();

		const { domainName, hostName, recordTracksEvent, redirect, service, updateDomain } = this.props;

		recordTracksEvent( 'delphin_existing_site_connect', { host: hostName } );

		updateDomain( domainName, service, hostName )
			.then( () => {
				redirect( 'confirmConnectExistingBlog', { pathParams: { domainName, hostName } } );
			} )
			.catch( noop );

		redirect( 'connectingExistingBlog', { pathParams: { domainName, hostName } } );
	}

	render() {
		const { domainName } = this.props;

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.headerContainer }>
					<div className={ styles.header }>
						<h1 className={ styles.headerText }>
							<span className={ styles.setUpLabel }>
								{ i18n.translate( 'Setup: ' ) }
							</span>

							{ i18n.translate( 'Connect to your blog.' ) }
						</h1>
						<ProgressBar progress={ 60 } />
					</div>
				</div>

				<Form onSubmit={ this.handleSubmit }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'Great, we can automatically configure your new domain to work with your existing blog.' ) }
						</p>

						<Button className={ styles.button }>
							{ i18n.translate( 'Connect now' ) }
						</Button>
					</Form.FieldArea>
				</Form>

				<div className={ styles.footer }>
					<Link to={ getPath( 'findExistingBlog', { domainName } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</div>
			</div>
		);
	}
}

ConnectExistingBlog.propTypes = {
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string.isRequired,
	recordTracksEvent: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	service: PropTypes.string.isRequired,
	updateDomain: PropTypes.func.isRequired
};

export default withStyles( styles )( withPageView( bindHandlers( ConnectExistingBlog ), 'Connect Existing Blog' ) );
