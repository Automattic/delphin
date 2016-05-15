// External dependencies
import { Link } from 'react-router';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import SearchInputContainer from 'components/containers/search-input';
import headerStyles from 'components/ui/layout/header/styles.scss';
import styles from './styles.scss';

const SearchHeader = ( { query, onQueryChange } ) => {
	return (
		<div className={ headerStyles.searchHeaderWrapper }>
			<header className={ headerStyles.searchHeader }>
				<SearchInputContainer
					{ ...{ query } }
					onQueryChange={ onQueryChange }
					placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

				<Link className={ styles.title } to={ getPath( 'home' ) }>
					<h1>MagicDomains</h1>
				</Link>
			</header>
		</div>
	);
};

SearchHeader.propTypes = {
	query: PropTypes.string.isRequired,
	onQueryChange: PropTypes.func.isRequired
};

export default withStyles( headerStyles, styles )( SearchHeader );
