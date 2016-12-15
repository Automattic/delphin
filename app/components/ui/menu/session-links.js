// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';
import Link from './link';

const SessionLinks = ( { isExcluded, isLoggedIn, logoutUser } ) => {
	if ( isExcluded ) {
		return null;
	}

	return (
		<span>
			{ isLoggedIn && (
				<Link to={ getPath( 'myDomains' ) }>
					{ i18n.translate( 'My Domains' ) }
				</Link>
			) }

			{ ! isLoggedIn && (
				<Link to={ getPath( 'loginUser' ) }>
					{ i18n.translate( 'Log In' ) }
				</Link>
			) }

			{ isLoggedIn && (
				<a className={ styles.link } onClick={ logoutUser }>
					{ i18n.translate( 'Log Out' ) }
				</a>
			) }
		</span>
	);
};

SessionLinks.propTypes = {
	isExcluded: PropTypes.bool.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default withStyles( styles )( SessionLinks );
