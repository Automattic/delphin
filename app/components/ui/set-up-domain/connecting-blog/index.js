// External dependencies
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import { getServiceName } from 'lib/services';
import { preventWidows } from 'lib/formatters';
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';

class ConnectingBlog extends Component {
	render() {
		const { blogType, domainName, hostName, service } = this.props;
		const serviceName = getServiceName( service );

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.header }>
					<h1>{ i18n.translate( 'Connecting your domain' ) }</h1>
					<ProgressBar progress={ 80 } />
					<h2>
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
					</h2>
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

export default ConnectingBlog;
