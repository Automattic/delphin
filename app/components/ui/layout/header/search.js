// External dependencies
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import SearchForm from 'components/containers/search-form';
import styles from './styles.scss';

const SearchHeader = ( { children } ) => {
	return (
		<div>
			<header className={ styles.header }>
				<SearchForm />

				<Link className={ styles.title } to={ getPath( 'home' ) }>
					<h1>MagicDomains</h1>
				</Link>
			</header>

			<div className={ styles.content }>
				{ children }
			</div>
		</div>
	);
};

SearchHeader.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( SearchHeader );
