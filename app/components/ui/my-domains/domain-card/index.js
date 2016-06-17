// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const DomainCard = ( { domainName, isSetup } ) => {
	if ( ! isSetup ) {
		return (
			<div className={
					classNames( {
						[ styles.domainCard ]: true,
						[ styles.notConnected ]: ! isSetup
					} )
				}>
				<div className={ styles.domainSetup }>
					<h3>{ domainName }</h3>
					<button>{ i18n.translate( 'Setup Now' ) }</button>
				</div>
			</div>
		);
	}

	return (
		<div className={ styles.domainCard }>
			<div className={ styles.domainScreenshot }>
				<img src="http://domainsearchproto.herokuapp.com/img/domain-screenshots/theroamingforks_com.jpg"/>
			</div>
			<h3>{ domainName }</h3>
		</div>
	);
};

DomainCard.propTypes = {
	domainName: PropTypes.string.isRequired,
	isSetup: PropTypes.bool.isRequired
};

export default withStyles( styles )( DomainCard );
