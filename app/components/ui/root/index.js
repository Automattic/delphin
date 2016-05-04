// External dependencies
import i18n from 'lib/i18n';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import Notices from '../../containers/notices';
import styles from './styles.scss';

const Root = ( { children } ) => {
	return (
		<div className={ styles.root }>
			<header className={ styles.header }>
				<Link className={ styles.title } to={ getPath( 'search' ) }>
					<h1>MagicDomains</h1>
				</Link>
			</header>

			<div className={ styles.content }>
				{ children }
			</div>

			<Notices />

			<footer className={ styles.footer }>
				<Link className={ styles.footerLink } to={ getPath( 'search' ) }>{ i18n.translate( 'Search' ) }</Link>
				<Link className={ styles.footerLink } to={ getPath( 'about' ) }>{ i18n.translate( 'About' ) }</Link>
				<Link className={ styles.footerLink } to={ getPath( 'createUser' ) }>{ i18n.translate( 'Signup' ) }</Link>
				<Link className={ styles.footerLink } to={ getPath( 'loginUser' ) }>{ i18n.translate( 'Log In' ) }</Link>
				<Link className={ styles.footerLink } to="https://wordpress.com">{ i18n.translate( 'A WordPress.com service' ) }</Link>
			</footer>
		</div>
	);
};

Root.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( Root );
