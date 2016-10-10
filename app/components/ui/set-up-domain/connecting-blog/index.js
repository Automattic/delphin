// External dependencies
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import { preventWidows } from 'lib/formatters';
import SunriseStep from 'components/ui/sunrise-step';

class ConnectingBlog extends Component {
	render() {
		const { domainName, hostName } = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Connecting your domain' ) }</h1>

					<h2>
						{ preventWidows( i18n.translate( 'Just a moment while we set up {{strong}}%(domainName)s{{/strong}} to work with your WordPress.com blog at {{strong}}%(hostName)s{{/strong}}.', {
							args: { domainName, hostName },
							components: { strong: <strong /> }
						} ), 2 ) }
					</h2>
				</SunriseStep.Header>
			</SunriseStep>
		);
	}
}

ConnectingBlog.propTypes = {
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string.isRequired
};

export default ConnectingBlog;
