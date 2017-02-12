// External dependencies
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import { getServiceName } from 'lib/services';
import { preventWidows } from 'lib/formatters';
import ProgressHeader from 'components/ui/set-up-domain/progress-header';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';

class ConnectingBlog extends Component {
	render() {
		const { blogType, domainName, hostName, service } = this.props;
		const serviceName = getServiceName( service );

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<ProgressHeader progress={ 80 }>
					{ i18n.translate( 'Connecting your domain.' ) }
				</ProgressHeader>

				<div className={ styles.contentContainer }>
					<div className={ styles.statusContainer }>
						<p className={ styles.statusMessage }>
							{ blogType === 'existing' && (
								preventWidows( i18n.translate( 'Just a moment while we set up {{strong}}%(domainName)s{{/strong}} to work with your %(serviceName)s blog at {{strong}}%(hostName)s{{/strong}}.', {
									args: { domainName, hostName, serviceName },
									components: { strong: <strong /> }
								} ), 2 )
							) }

							{ blogType === 'new' && (
								preventWidows( i18n.translate( 'Just a moment while we set up {{strong}}%(domainName)s{{/strong}} to work with %(serviceName)s.', {
									args: { domainName, serviceName },
									components: { strong: <strong /> }
								} ), 2 )
							) }
						</p>
					</div>
				</div>
			</div>
		);
	}
}

ConnectingBlog.propTypes = {
	blogType: PropTypes.string.isRequired,
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string,
	service: PropTypes.string.isRequired
};

export default withStyles( styles )( withPageView( ConnectingBlog, 'Connecting Blog' ) );
