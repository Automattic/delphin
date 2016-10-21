// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';
import withAssets from 'lib/assets/with-assets';

const HostThumbnail = ( { domainName, imageUrl, slug, name, shortDescription } ) => (
	<li className={ styles.thumbnail + ' ' + styles[ slug ] } key={ name }>
		<div className={ styles.logo + ' ' + styles[ slug ] } />
		<h3 className={ styles.thumbnailName }>{ name }</h3>
		<p className={ styles.thumbnailDescription }>{ shortDescription }</p>
		<Link className={ styles.thumbnailLearnMore } to={ getPath( 'hostInfo', { domainName, slug } ) }>{ i18n.translate( 'Learn More' ) }</Link>
		<a className={ styles.thumbnailConnect }>
			<img className={ styles.thumbnailLinkIcon } src={ imageUrl( 'link.svg' ) } />
			{ i18n.translate( 'Connect Now' ) }
		</a>
	</li>
);

HostThumbnail.propTypes = {
	domainName: PropTypes.string.isRequired,
	imageUrl: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	shortDescription: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired
};

export default withStyles( styles )( withAssets( HostThumbnail ) );
