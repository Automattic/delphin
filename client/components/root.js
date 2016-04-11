import React from 'react';
import { Link } from 'react-router';
import Search from './search';

const CSS = {
	body: {
		fontFamily: 'Helvetica, Arial, sans-serif'
	},
	header: {
		background: '#000',
	},
	headerLink: {
		color: '#fff',
		display: 'inline-block',
		margin: '0.5em 1em',
		textDecoration: 'none'
	},
	main: {
		margin: '0 auto',
		maxWidth: '960px',
	}
};

export default function Root( { children } ) {
	return (
		<div style={ CSS.body }>
			<header style={ CSS.header }>
				<Link style={ CSS.headerLink } to="/">Home</Link>
				<Link style={ CSS.headerLink } to="/about">About</Link>
				<Link style={ CSS.headerLink } to="/search">Search</Link>
			</header>
			<div style={ CSS.main }>
				<Search />
			</div>
			<div style={ { marginTop: '1.5em' } }>{ children }</div>
		</div>
	);
}
