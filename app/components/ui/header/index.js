// External dependencies
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

const DefaultHeader = () => {
	return (
		<header className={ styles.header }>
			<Link className={ styles.title } to={ getPath( 'home' ) }>
				<h1>MagicDomains</h1>
			</Link>
		</header>
	);
};

export default withStyles( styles )( DefaultHeader );
