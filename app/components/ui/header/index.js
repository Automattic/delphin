// External dependencies
import { translate } from 'i18n-calypso';
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import { imageUrl } from 'lib/assets';
import styles from './styles.scss';

const Header = () => {
	return (
		<header className={ styles.header }>
			<Link className={ styles.logo } to={ getPath( 'home' ) }>
				<img alt="get.blog" src={ imageUrl( 'get-dot-blog-logo-dark.svg' ) } />
			</Link>
			<div className={ styles.links }>
				<Link className={ styles.myDomainsLink } to={ getPath( 'myDomains' ) }>
					{ translate( 'My Domains' ) }
				</Link>
			</div>
		</header>
	);
};

export default withStyles( styles )( Header );
