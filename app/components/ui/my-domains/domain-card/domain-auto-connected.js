// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getServiceName } from 'lib/services';

// Internal dependencies
import styles from './styles.scss';

class DomainAutoConnected extends Component {
	handleResetDomain( event ) {
		event.preventDefault();

		const { domainName, recordTracksEvent, resetDomain } = this.props;

		recordTracksEvent( 'delphin_reset_settings_click', { domain_name: domainName } );

		resetDomain( domainName, 'sawbuck' );
	}

	render() {
		const { domainName, service } = this.props;

		return (
			<div className={ classNames( styles.domainCard, styles.connectedAuto ) }>
				<div className={ styles.domainHeading }>
					<h3>{ domainName }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p className={ classNames( styles.domainSetupAuto, styles[ service ] ) }>
						{ i18n.translate( 'This domain was automatically set up for your %(serviceName)s site.', {
							args: { serviceName: getServiceName( service ) },
							comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
						} ) }
					</p>
				</div>
				<div className={ styles.domainCardFooter }>
					<a
						href="#"
						onClick={ this.handleResetDomain }
						className={ styles.resetSettings }
					>{ i18n.translate( 'Reset to default settings' ) }</a>
				</div>
			</div>
		);
	}
}

DomainAutoConnected.propTypes = {
	domainName: PropTypes.string.isRequired,
	recordTracksEvent: PropTypes.func.isRequired,
	resetDomain: PropTypes.func.isRequired,
	service: PropTypes.string.isRequired,
};

export default withStyles( styles )( bindHandlers( DomainAutoConnected ) );
