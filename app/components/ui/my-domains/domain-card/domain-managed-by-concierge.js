// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

const DomainManagedByConcierge = ( { domainName, hostName } ) => {
	const contactUs = hostName
		? getPath( 'contactUsExistingBlog', { domainName, hostName } )
		: getPath( 'connectNewBlogToOther', { domainName } );

	return (
		<div className={ classnames( styles.domainCard, styles.connectedConcierge ) }>
			<div className={ styles.domainHeading }>
				<h3>{ domainName }</h3>
			</div>
			<div className={ styles.domainDetails }>
				<p>{ i18n.translate( 'This domain is being managed by your domain concierge.' ) }</p>
				<p className={ styles.smallText }>
					<a href={ contactUs }>{ i18n.translate( 'Contact your domain concierge.' ) }</a>
				</p>
			</div>
		</div>
	);
};

DomainManagedByConcierge.propTypes = {
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string.isRequired
};

export default withStyles( styles )( DomainManagedByConcierge );
