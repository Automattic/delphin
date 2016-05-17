// External dependencies
import React from 'react';
import some from 'lodash/some';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import i18n from 'i18n-calypso';
import styles from './info.scss';
import { isAvailableDomainName } from 'lib/domains';

function isExactMatchUnAvailable( query, results, isFetching ) {
	console.log( isAvailableDomainName( query ) );
	return ! isFetching &&
		isAvailableDomainName( query ) &&
		results && ! some( results, ( result ) => {
			return result.domain_name === query;
		} );
}

const Info = ( props ) => {
	const { values: { query }, domainSearch: { isFetching }, results } = props;

	if ( ! isExactMatchUnAvailable( query, results, isFetching ) ) {
		return null;
	}

	return (
		<div className={ styles.searchInfo }>
			{ i18n.translate( 'Darn, {{i}}%(query)s{{/i}} has already been snatched up!', {
				args: { query },
				components: {
					i: <i />
				}
			} ) }
		</div>
	);
};

export default withStyles( styles )( Info );
