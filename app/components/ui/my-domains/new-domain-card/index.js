// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

const NewDomainCard = () => {
	return (
		<a className={ styles.newDomainCard } href={ getPath( 'search' ) }>
			<div>
				<svg className={ styles.gridicon } height="48" width="48" viewBox="0 0 24 24">
					<g><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
				</svg>
				<span>{ i18n.translate( 'Find a New Domain' ) }</span>
			</div>
		</a>
	);
};

export default withStyles( styles )( NewDomainCard );
