// External dependencies
import i18n from 'lib/i18n';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

const Menu = ( { logoutUser, user } ) => {
	return (
		<menu className={ styles.menu }>
			<Link className={ styles.link } to={ getPath( 'home' ) }>{ i18n.translate( 'Home' ) }</Link>
			<Link className={ styles.link } to={ getPath( 'about' ) }>{ i18n.translate( 'About' ) }</Link>
			{ ! user.isLoggedIn && <Link className={ styles.link } to={ getPath( 'signupUser' ) }>{ i18n.translate( 'Signup' ) }</Link>	}
			{ ! user.isLoggedIn && <Link className={ styles.link } to={ getPath( 'loginUser' ) }>{ i18n.translate( 'Log In' ) }</Link> }
			{ user.isLoggedIn && <a className={ styles.link } onClick={ logoutUser }>{ i18n.translate( 'Log Out' ) }</a> }
			<Link className={ styles.link } to="https://wordpress.com">{ i18n.translate( 'A WordPress.com service' ) }</Link>
		</menu>
	);
};

Menu.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles( styles )( Menu );
