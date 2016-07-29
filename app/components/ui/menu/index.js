// External dependencies
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Menu = () => {
	return (
		<menu className={ styles.menu }>
			<Link className={ styles.link } to="mailto:help@get.blog">{ i18n.translate( 'Support' ) }</Link>
			<Link className={ styles.link } to="https://wordpress.com/automattic-domain-name-registration-agreement/">{ i18n.translate( 'Terms of Use' ) }</Link>
			<Link className={ styles.link } to="https://wordpress.com">{ i18n.translate( 'A WordPress.com Service' ) }</Link>
		</menu>
	);
};

Menu.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default withStyles( styles )( Menu );
