// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

const HostThumbnail = ( { slug, logoUrl, name, shortDescription } ) => (
	<li className={ styles.thumbnail + ' ' + styles[ slug ] } key={ name }>
		<img src={ logoUrl } />
		<h3 className={ styles.thumbnailName }>{ name }</h3>
		<p className={ styles.thumbnailDescription }>{ shortDescription }</p>
		<Link className={ styles.thumbnailLearnMore } to={ getPath( 'hostInfo', { slug } ) }>{ i18n.translate( 'Learn More' ) }</Link>
		<a className={ styles.thumbnailConnect }>
			<img className={ styles.thumbnailLinkIcon } src="/images/link.svg" />
			{ i18n.translate( 'Connect Now' ) }
		</a>
	</li>
);

HostThumbnail.propTypes = {
	logoUrl: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	shortDescription: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired
};

export default withStyles( styles )( HostThumbnail );
