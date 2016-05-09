// External dependencies
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import Menu from 'components/containers/menu';
import Notices from 'components/containers/notices';
import styles from './styles.scss';

const Root = ( { children } ) => {
	return (
		<div className={ styles.root }>
			<header className={ styles.header }>
				<Link className={ styles.title } to={ getPath( 'search' ) }>
					<h1>MagicDomains</h1>
				</Link>
			</header>

			<div className={ styles.content }>
				{ children }
			</div>

			<Notices />

			<Menu />
		</div>
	);
};

Root.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( Root );
