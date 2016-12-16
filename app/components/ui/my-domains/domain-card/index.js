// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DomainManagedByConcierge from './domain-managed-by-concierge';
import DomainNotConnected from './domain-not-connected';
import DomainAutoConnected from 'components/containers/domain-auto-connected';
import DomainWithCustomNameservers from 'components/containers/domain-with-custom-nameservers';
import DomainPending from './domain-pending';
import {
	canConnectToService,
	isConnectedWithNameservers,
	isManagedByConcierge
} from 'lib/services';
import styles from './styles.scss';

const DomainCard = ( { domainName, hostName, isPending, service } ) => {
	if ( isPending ) {
		return (
			<DomainPending
				domainName={ domainName }
			/>
		);
	}

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
		return (
			<DomainWithCustomNameservers
				domainName={ domainName }
			/>
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
	isPending: PropTypes.bool.isRequired,
	service: PropTypes.string.isRequired
};

export default withStyles( styles )( DomainCard );
