// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const DomainPending = ( { domainName } ) => {
	return (
		<div className={ classnames( styles.domainCard, styles.notConnected ) }>
			<div className={ styles.domainHeading }>
				<h3>{ domainName }</h3>
			</div>
			<div className={ styles.domainDetails }>
				<p>{ i18n.translate( 'Your action is needed. We sent you an email with instructions for finalizing this order.' ) }</p>
			</div>
		</div>
	);
};

DomainPending.propTypes = {
	domainName: PropTypes.string.isRequired
};

export default withStyles( styles )( DomainPending );
