// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import { getPath } from 'routes';
import { getServiceName } from 'lib/services';
import styles from './styles.scss';

const DomainCard = ( { name, detailsVisible, hostName, service } ) => {
	const isSetup = service !== 'default';
	const domainCardClassNames = classnames( {
		[ styles.domainCard ]: true,
		[ styles.notConnected ]: ! isSetup,
		[ styles.connectedAuto ]: service === 'wpcom' || service === 'pressable',
		[ styles.connectedConcierge ]: service === 'custom' && hostName,
		[ styles.connectedNameservers ]: service === 'custom' && ! hostName,
		[ styles.showDetails ]: isSetup && detailsVisible
	} );

	if ( service === 'pressable' ) {
		return (
			<div className={ domainCardClassNames }>
				<div className={ styles.domainHeading }>
					<h3>{ name }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p className={ styles.domainSetupPressable }>
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

	if ( service === 'wpcom' ) {
		return (
			<div className={ domainCardClassNames }>
				<div className={ styles.domainHeading }>
					<h3>{ name }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p className={ styles.domainSetupWpcom }>
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

	if ( service === 'custom' && hostName ) {
		return (
			<div className={ domainCardClassNames }>
				<div className={ styles.domainHeading }>
					<h3>{ name }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p>{ i18n.translate( 'This domain is being managed by your domain concierge.' ) }</p>
					<p className={ styles.smallText }>
						<a>{ i18n.translate( 'Contact your domain concierge.' ) }</a>
					</p>
				</div>
			</div>
		);
	}

	if ( service === 'custom' && ! hostName ) {
		return (
			<div className={ domainCardClassNames }>
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
							<li>ns1.example.com</li>
							<li>ns2.example.com</li>
							<li>ns3.example.com</li>
							<li>ns4.example.com</li>
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
		<div className={ domainCardClassNames }>
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
	detailsVisible: PropTypes.bool.isRequired,
	hostName: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	service: PropTypes.string.isRequired,
	toggleDetails: PropTypes.func.isRequired
};

export default withStyles( styles )( DomainCard );
