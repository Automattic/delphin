// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import styles from './styles.scss';

const NewDomainCard = () => {
	const newSearchUrl = config( 'new_search_url' );
	return (
		<a className={ styles.newDomainCard } href={ newSearchUrl }>
			<div>
				<span>
					{ i18n.translate( 'Use wordpress.com/domains to find a new domain.' ) }
				</span>
			</div>
		</a>
	);
};

export default withStyles( styles )( NewDomainCard );
