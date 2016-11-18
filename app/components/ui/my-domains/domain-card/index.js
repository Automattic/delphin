// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import { getPath } from 'routes';
import {
	getServiceName,
	isAutoConnected,
	isConnectedWithNameservers,
	isManagedByConcierge
} from 'lib/services';
import styles from './styles.scss';

const DomainCard = ( { name, service } ) => {
	if ( isAutoConnected( service ) ) {
		return (
			<div className={ classnames( styles.domainCard, styles.connectedAuto ) }>
				<div className={ styles.domainHeading }>
					<h3>{ name }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p className={ classnames( styles.domainSetupAuto, styles[service] ) }>
						{ i18n.translate( 'This domain was automatically set up for your %(serviceName)s site.', {
							args: { serviceName: getServiceName( service ) },
							comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
						} ) }
					</p>
				</div>
				<div className={ styles.domainCardFooter }>
					<a href="#" className={ styles.resetSettings }>{ i18n.translate( 'Reset to default settings' ) }</a>
				</div>
			</div>
		);
	}

	if ( isManagedByConcierge( service ) ) {
		return (
			<div className={ classnames( styles.domainCard, styles.connectedConcierge ) }>
				<div className={ styles.domainHeading }>
					<h3>{ name }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p>{ i18n.translate( 'This domain is being managed by your domain concierge.' ) }</p>
					<p className={ styles.smallText }>
						<a href="#">{ i18n.translate( 'Contact your domain concierge.' ) }</a>
					</p>
				</div>
			</div>
		);
	}

	if ( isConnectedWithNameservers( service ) ) {
		const nameservers = [];

		return (
			<div className={ classnames( styles.domainCard, styles.connectedNameservers ) }>
				<div className={ styles.domainHeading }>
					<h3>{ name }</h3>
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
		<div className={ classnames( styles.domainCard, styles.notConnected ) }>
			<div className={ styles.domainHeading }>
				<h3>{ name }</h3>
				<Button href={ getPath( 'selectBlogType', { domainName: name } ) }>{ i18n.translate( 'Set up' ) }</Button>
			</div>
			<div className={ styles.domainDetails }>
				<p>{ i18n.translate( "You haven't set up this domain yet." ) }</p>
			</div>
		</div>
	);
};

DomainCard.propTypes = {
	name: PropTypes.string.isRequired,
	service: PropTypes.string.isRequired
};

export default withStyles( styles )( DomainCard );
