// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HostThumbnail from 'components/ui/hosts/host-thumbnail';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import { hosts } from 'lib/hosts';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';

const Hosts = () => {
	return (
		<DocumentTitle title={ i18n.translate( 'Hosts' ) }>
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
		</DocumentTitle>
	);
};

export default withStyles( styles )( withPageView( Hosts, 'hosts', 'Hosts' ) );
