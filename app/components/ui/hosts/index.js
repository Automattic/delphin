// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HostThumbnail from 'components/ui/hosts/host-thumbnail';

// Internal dependencies
import { hosts } from 'lib/hosts';
import styles from './styles.scss';

const Hosts = () => {
	return (
		<section className={ styles.content }>
			<h2 className={ styles.heading2 }>
				{ i18n.translate( 'Where would you like to create your blog?' ) }
			</h2>
			<h3 className={ styles.heading3 }>
				{ i18n.translate( 'Here are a few powerful options that can be connected automatically to your domain using MagicDomains.' ) }
			</h3>
			<ul className={ styles.hostThumbnailsList } >
				{ hosts.map( host => <HostThumbnail key={ host.name } { ...host } /> ) }
			</ul>
		</section>
	);
};

export default withStyles( styles )( Hosts );
