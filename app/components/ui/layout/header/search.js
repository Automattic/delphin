// External dependencies
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import SearchForm from 'components/containers/search-form';
import styles from './styles.scss';

const SearchHeader = ( props ) => {
	return (
		<div>
			<div className={ styles.searchHeaderWrapper }>
				<header className={ styles.searchHeader }>
					<SearchForm { ...props } />

					<Link className={ styles.title } to={ getPath( 'home' ) }>
						<h1>MagicDomains</h1>
					</Link>
				</header>
			</div>

			<div className={ styles.contentWithSearchHeader }>
				{ props.children }
			</div>
		</div>
	);
};

SearchHeader.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( SearchHeader );
