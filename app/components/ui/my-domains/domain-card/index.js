// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const DomainCard = ( { domainName, isSetup, detailsVisible, toggleDetails } ) => {
	const domainCardClassNames = classNames( {
		[ styles.domainCard ]: true,
		[ styles.notConnected ]: ! isSetup,
		[ styles.showDetails ]: isSetup && detailsVisible
	} );

	if ( ! isSetup ) {
		return (
			<div className={ domainCardClassNames }>
				<div className={ styles.domainSetup }>
					<h3>{ domainName }</h3>
					<button>{ i18n.translate( 'Setup Now' ) }</button>
				</div>
			</div>
		);
	}

	return (
		<div className={ domainCardClassNames } onClick={ toggleDetails }>
			<div className={ styles.domainScreenshot }>
				<img src="http://domainsearchproto.herokuapp.com/img/domain-screenshots/theroamingforks_com.jpg"/>
			</div>
			<h3>{ domainName }</h3>
			<div className={ styles.domainDetails }>
				<div className={ styles.domainConnected }>
					<span className="icon icon-partner">
						<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style={ { enableBackground: 'new 0 0 24 24' } }>
							<g>
							<path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M3.5,12
							c0-1.232,0.264-2.402,0.736-3.459L8.291,19.65C5.455,18.272,3.5,15.365,3.5,12z M12,20.501c-0.834,0-1.64-0.122-2.401-0.346
							l2.551-7.411l2.613,7.158c0.017,0.042,0.038,0.081,0.061,0.117C13.939,20.33,12.99,20.501,12,20.501z M13.172,8.015
							c0.512-0.027,0.973-0.081,0.973-0.081c0.458-0.054,0.404-0.727-0.054-0.701c0,0-1.377,0.108-2.266,0.108
							c-0.835,0-2.239-0.108-2.239-0.108C9.127,7.207,9.074,7.907,9.532,7.934c0,0,0.434,0.054,0.892,0.081l1.324,3.629l-1.86,5.579
							L6.792,8.015c0.512-0.027,0.973-0.081,0.973-0.081C8.223,7.88,8.168,7.207,7.71,7.233c0,0-1.376,0.108-2.265,0.108
							c-0.16,0-0.347-0.004-0.547-0.01C6.418,5.024,9.03,3.5,12,3.5c2.213,0,4.228,0.846,5.74,2.232c-0.037-0.002-0.072-0.007-0.11-0.007
							c-0.835,0-1.427,0.727-1.427,1.509c0,0.701,0.404,1.293,0.835,1.994c0.323,0.566,0.701,1.293,0.701,2.344
							c0,0.727-0.28,1.572-0.647,2.748l-0.848,2.833L13.172,8.015z M16.273,19.347l2.596-7.506c0.485-1.213,0.646-2.182,0.646-3.045
							c0-0.313-0.021-0.603-0.057-0.874C20.122,9.133,20.5,10.522,20.5,12C20.5,15.136,18.801,17.874,16.273,19.347z"></path>
							</g>
						</svg>
						<span>
							Connected to a WordPress.com site<br/>
							<span className="site-name">theroamingforks.com</span><br/>
							<a href="#" className="disconnect">Disconnect</a>
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

DomainCard.propTypes = {
	domainName: PropTypes.string.isRequired,
	isSetup: PropTypes.bool.isRequired
};

export default withStyles( styles )( DomainCard );
