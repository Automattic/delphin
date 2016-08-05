// External dependencies
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

const Header = () => {
	return (
		<header className={ styles.header }>
			<Link className={ styles.logo } to={ getPath( 'home' ) }>
				<img alt="get.blog" src="https://s0.wp.com/wp-content/themes/a8c/getdotblog/public/images/get-dot-blog-logo.svg" />
			</Link>
		</header>
	);
};

export default withStyles( styles )( Header );
