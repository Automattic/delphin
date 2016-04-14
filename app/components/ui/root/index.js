// External dependencies
import i18n from 'lib/i18n';
import { Link } from 'react-router';
import React from 'react';

const CSS = {
	body: {
		fontFamily: 'Helvetica, Arial, sans-serif'
	},
	footer: {
		fontSize: '0.8rem',
		position: 'absolute',
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
				<Link style={ CSS.footerLink } to="http://automattic.com">{ i18n.translate( 'An Automattic production' ) }</Link>
			</footer>
		</div>
	);
}
