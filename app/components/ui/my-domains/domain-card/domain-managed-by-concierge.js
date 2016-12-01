// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import CustomNameServersLink from 'components/ui/set-up-domain/custom-name-servers-link';
import { getPath } from 'routes';
import styles from './styles.scss';

const DomainManagedByConcierge = ( { domainName, hostName } ) => {
	return (
		<div className={ classnames( styles.domainCard, styles.connectedConcierge ) }>
			<div className={ styles.domainHeading }>
				<h3>{ domainName }</h3>
			</div>
			<div className={ styles.domainDetails }>
				<p>{ i18n.translate( 'This domain is being managed by your domain assistant.', {
					comment: 'The domain assistant is our customer support team'
				} ) }</p>
				<p className={ styles.smallText }>
					<Link to={ getPath( 'contactConcierge', { domainName, hostName } ) }>{ i18n.translate( 'Contact your domain assistant.', {
						comment: 'The domain assistant is our customer support team'
					} ) }</Link>
				</p>
			</div>
			<div className={ styles.customNameserversContainer }>
				<CustomNameServersLink domainName={ domainName } />
			</div>
		</div>
	);
};

DomainManagedByConcierge.propTypes = {
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string,
};

export default withStyles( styles )( DomainManagedByConcierge );
