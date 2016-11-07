// External dependencies
import classnames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';
import TrackingButton from 'components/containers/tracking-button';

const DomainNotConnected = ( { domainName } ) => {
	return (
		<div className={ classnames( styles.domainCard, styles.notConnected ) }>
			<div className={ styles.domainHeading }>
				<h3>{ domainName }</h3>
				<TrackingButton
					href={ getPath( 'selectBlogType', { domainName } ) }
					eventName="delphin_set_up_domain_click"
				>
					{ i18n.translate( 'Set up' ) }
				</TrackingButton>
			</div>
			<div className={ styles.domainDetails }>
				<p>{ i18n.translate( "You haven't set up this domain yet." ) }</p>
			</div>
		</div>
	);
};

DomainNotConnected.propTypes = {
	domainName: PropTypes.string.isRequired
};

export default withStyles( styles )( DomainNotConnected );
