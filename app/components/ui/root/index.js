// External dependencies
import i18n from 'lib/i18n';
import { Link } from 'react-router';
import React from 'react';

// Internal dependencies
import paths from 'paths';

export default function Root( { children } ) {
	return (
		<div className="root">
			<div className="root__main">{ children }</div>
			<footer className="root__footer">
				<Link className="root__footer-link" to={ paths.search() }>{ i18n.translate( 'Search' ) }</Link>
				<Link className="root__footer-link" to={ paths.about() }>{ i18n.translate( 'About' ) }</Link>
				<Link className="root__footer-link" to="https://wordpress.com">{ i18n.translate( 'A WordPress.com service' ) }</Link>
			</footer>
		</div>
	);
}
