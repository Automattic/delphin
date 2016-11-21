// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getServiceName } from 'lib/services';

// Internal dependencies
import styles from './styles.scss';

const DomainAutoConnected = ( { domainName, service } ) => {
	return (
		<div className={ classnames( styles.domainCard, styles.connectedAuto ) }>
			<div className={ styles.domainHeading }>
				<h3>{ domainName }</h3>
			</div>
			<div className={ styles.domainDetails }>
				<p className={ classnames( styles.domainSetupAuto, styles[ service ] ) }>
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
};

DomainAutoConnected.propTypes = {
	domainName: PropTypes.string.isRequired,
	service: PropTypes.string.isRequired,
};

export default withStyles( styles )( DomainAutoConnected );
