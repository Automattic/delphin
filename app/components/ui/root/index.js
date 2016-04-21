// External dependencies
import i18n from 'lib/i18n';
import { Link } from 'react-router';
import React from 'react';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

export default function Root( { children } ) {
	return (
		<div className={ styles.root }>
			<div className={ styles.main }>{ children }</div>
			<footer className={ styles.footer }>
				<Link className={ styles.footerLink } to={ getPath( 'search' ) }>{ i18n.translate( 'Search' ) }</Link>
				<Link className={ styles.footerLink } to={ getPath( 'about' ) }>{ i18n.translate( 'About' ) }</Link>
				<Link className={ styles.footerLink } to="https://wordpress.com">{ i18n.translate( 'A WordPress.com service' ) }</Link>
			</footer>
		</div>
	);
}
