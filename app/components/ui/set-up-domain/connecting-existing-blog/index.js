// External dependencies
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import { preventWidows } from 'lib/formatters';
import SunriseStep from 'components/ui/sunrise-step';

class ConnectingExistingBlog extends Component {
	render() {
		const { domainName } = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Connecting your domain' ) }</h1>

					<h2>
						{ preventWidows( i18n.translate( 'Just a moment while we set up {{strong}}%(domainName)s{{/strong}} to work with your WordPress.com blog.', {
							args: { domainName },
							components: { strong: <strong /> }
						} ), 2 ) }
					</h2>
				</SunriseStep.Header>
			</SunriseStep>
		);
	}
}

ConnectingExistingBlog.propTypes = {
	domainName: PropTypes.string.isRequired
};

export default ConnectingExistingBlog;
