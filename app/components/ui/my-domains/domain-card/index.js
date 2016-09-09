// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import WordPressIcon from 'assets/svg/wordpress.svg';

const DomainCard = ( { name, isSetup, detailsVisible, toggleDetails } ) => {
	const domainCardClassNames = classNames( {
		[ styles.domainCard ]: true,
		[ styles.notConnected ]: ! isSetup,
		[ styles.showDetails ]: isSetup && detailsVisible
	} );

	if ( ! isSetup ) {
		return (
			<div className={ domainCardClassNames }>
				<div className={ styles.domainSetup }>
					<h3>{ name }</h3>
					<button>{ i18n.translate( 'Setup Now' ) }</button>
				</div>
			</div>
		);
	}

	return (
		<div className={ domainCardClassNames } onClick={ toggleDetails }>
			<div className={ styles.domainScreenshot }>
				<img src={ 'https://s0.wp.com/mshots/v1/http://' + name + '/?w=500' }/>
			</div>
			<div className={ styles.domainInfo }>
				<h3>{ name }</h3>
				<div className={ styles.domainDetails }>
					<span className={ styles.icon }>
						<WordPressIcon/>
						<span>
							{ i18n.translate( 'Connected to a WordPress.com site' ) }
							<br/>
							<span className={ styles.siteName }>{ name }</span>
							<br/>
							<a href="#" className={ styles.disconnect }>
								{ i18n.translate( 'Disconnect' ) }
							</a>
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

DomainCard.propTypes = {
	detailsVisible: PropTypes.bool.isRequired,
	isSetup: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	toggleDetails: PropTypes.func.isRequired
};

export default withStyles( styles )( DomainCard );
