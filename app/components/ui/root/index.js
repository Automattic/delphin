// External dependencies
import i18n from 'lib/i18n';
import { Link } from 'react-router';
import React from 'react';

const CSS = {
	body: {
		color: '#404040',
		fontFamily: 'Helvetica, Arial, sans-serif',
		paddingBottom: '2em',
		position: 'relative'
	},
	footer: {
		backgroundColor: '#fff',
		boxShadow: '-1px -1px 1px rgba( 0, 0, 0, .2 )',
		fontSize: '0.8rem',
		position: 'fixed',
			bottom: 0,
			left: 0,
			right: 0,
		textAlign: 'center'
	},
	footerLink: {
		color: '#666',
		display: 'inline-block',
		margin: '0.5em 1em',
		textDecoration: 'none'
	},
	main: {
		margin: '0 auto',
		maxWidth: '960px',
		padding: '1em'
	}
};

export default function Root( { children } ) {
	return (
		<div style={ CSS.body }>
			<div style={ CSS.main }>{ children }</div>
			<footer style={ CSS.footer }>
				<Link style={ CSS.footerLink } to="/search">{ i18n.translate( 'Search' ) }</Link>
				<Link style={ CSS.footerLink } to="/about">{ i18n.translate( 'About' ) }</Link>
				<Link style={ CSS.footerLink } to="https://wordpress.com">{ i18n.translate( 'A WordPress.com service' ) }</Link>
			</footer>
		</div>
	);
}
