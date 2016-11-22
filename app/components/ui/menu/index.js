// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';
import TrackingLink from 'components/containers/tracking-link';

const Link = ( { children, to } ) => {
	return (
		<TrackingLink eventName="delphin_footer_link_click" className={ styles.link } to={ to }>
			{ children }
		</TrackingLink>
	);
};

Link.propTypes = {
	children: PropTypes.node.isRequired,
	to: PropTypes.string.isRequired
};

const Menu = ( { isLoggedIn, logoutUser } ) => {
	return (
		<menu className={ styles.menu }>
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

			<Link to={ getPath( 'learnMore' ) }>
				{ i18n.translate( 'Support' ) }
			</Link>

			<Link to="https://automattic.com/privacy/">
				{ i18n.translate( 'Privacy Policy' ) }
			</Link>

			<Link to="https://wordpress.com">
				{ i18n.translate( 'A WordPress.com Service' ) }
			</Link>
		</menu>
	);
};

Menu.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default withStyles( styles )( Menu );
