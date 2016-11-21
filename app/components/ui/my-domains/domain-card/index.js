// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DomainManagedByConcierge from './domain-managed-by-concierge';
import DomainNotConnected from './domain-not-connected';
import DomainAutoConnected from './domain-auto-connected';
import {
	canConnectToService,
	isConnectedWithNameservers,
	isManagedByConcierge
} from 'lib/services';
import styles from './styles.scss';

const DomainCard = ( { domainName, hostName, service } ) => {
	if ( canConnectToService( service ) ) {
		return (
			<DomainAutoConnected
				service={ service }
				domainName={ domainName }
			/>
		);
	}

	if ( isManagedByConcierge( service ) ) {
		return (
			<DomainManagedByConcierge
				domainName={ domainName }
				hostName={ hostName } />
		);
	}

	if ( isConnectedWithNameservers( service ) ) {
		const nameservers = [];

		return (
			<div className={ classnames( styles.domainCard, styles.connectedNameservers ) }>
				<div className={ styles.domainHeading }>
					<h3>{ domainName }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p>{ i18n.translate( 'This domain has custom name servers:' ) }</p>
					<div className={ styles.nameservers }>
						<div className={ styles.nameserversLoading }>
							{ i18n.translate( 'Fetching name servers…' ) }
						</div>
						<ul className={ styles.nameserversList }>
							{ nameservers.map( nameserver => (
								<li>{ nameserver }</li>
							) ) }
						</ul>
					</div>
				</div>
				<div className={ styles.domainCardFooter }>
					<a href="#">{ i18n.translate( 'Change name servers' ) }</a>
					<a href="#" className={ styles.resetSettings }>{ i18n.translate( 'Revert to default name servers' ) }</a>
				</div>
			</div>
		);
	}

	return (
		<DomainNotConnected
			domainName={ domainName } />
	);
};

DomainCard.propTypes = {
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string.isRequired,
	service: PropTypes.string.isRequired
};

export default withStyles( styles )( DomainCard );
