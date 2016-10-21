// External dependencies
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';
import withAssets from 'lib/assets/with-assets';

const Header = ( { imageUrl } ) => {
	return (
		<header className={ styles.header }>
			<Link className={ styles.logo } to={ getPath( 'home' ) }>
				<img alt="get.blog" src={ imageUrl( 'get-dot-blog-logo-dark.svg' ) } />
			</Link>
		</header>
	);
};

Header.propTypes = {
	imageUrl: PropTypes.func.isRequired
};

export default withStyles( styles )( withAssets( Header ) );
