/**
 * External dependencies
 */
import i18n from 'lib/i18n';
import { Link } from 'react-router';
import React from 'react';

const CSS = {
	body: {
		fontFamily: 'Helvetica, Arial, sans-serif'
	},
	header: {
		background: '#000'
	},
	headerLink: {
		color: '#fff',
		display: 'inline-block',
		margin: '0.5em 1em',
		textDecoration: 'none'
	},
	main: {
		margin: '0 auto',
		maxWidth: '960px'
	}
};

export default function Root( { children } ) {
	return (
		<div style={ CSS.body }>
			<header style={ CSS.header }>
				<Link style={ CSS.headerLink } to="/search">{ i18n.translate( 'Search' ) }</Link>
				<Link style={ CSS.headerLink } to="/about">{ i18n.translate( 'About' ) }</Link>
			</header>
			<div style={ CSS.main }>{ children }</div>
		</div>
	);
}
