// External dependencies
import { Link } from 'react-router';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import SearchInputContainer from 'components/containers/search-input';
import headerStyles from 'components/ui/header/styles.scss';
import styles from './styles.scss';

const SearchHeader = ( { query, onQueryChange } ) => {
	return (
		<header className={ headerStyles.searchHeader }>
			<SearchInputContainer
				{ ...{ query } }
				onQueryChange={ onQueryChange }
				placeholder={ i18n.translate( 'Type a few keywords or a domain' ) } />

			<Link className={ headerStyles.searchLogo } to={ getPath( 'home' ) }>
				<img alt="get.blog" src="https://s0.wp.com/wp-content/themes/a8c/getdotblog/public/images/get-dot-blog-logo-dark.svg" />
			</Link>
		</header>
	);
};

SearchHeader.propTypes = {
	onQueryChange: PropTypes.func.isRequired,
	query: PropTypes.string.isRequired
};

export default withStyles( headerStyles, styles )( SearchHeader );
