// External dependencies
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import { preventWidows } from 'lib/formatters';
import SunriseStep from 'components/ui/sunrise-step';

class ConnectingBlog extends Component {
	componentDidMount() {
		setTimeout( () => {
			this.props.redirectToConfirmConnectBlog();
		}, 1500 );
	}

	render() {
		const { blogType, domainName, hostName, service } = this.props;

		let serviceName;
		if ( service === 'wpcom' ) {
			serviceName = 'WordPress.com';
		}

		if ( service === 'pressable' ) {
			serviceName = 'Pressable';
		}

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Connecting your domain' ) }</h1>

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
				</SunriseStep.Header>
			</SunriseStep>
		);
	}
}

ConnectingBlog.propTypes = {
	blogType: PropTypes.string.isRequired,
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string,
	redirectToConfirmConnectBlog: PropTypes.func.isRequired,
	service: PropTypes.string
};

export default ConnectingBlog;
