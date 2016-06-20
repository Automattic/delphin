// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HostThumbnailContainer from 'components/containers/host-thumbnail';

// Internal dependencies
import styles from './styles.scss';

class Hosts extends React.Component {
	render() {
		return <section>
			<h2>{ i18n.translate( 'Where would you like to create your blog?' ) }</h2>
			<p>{ i18n.translate( 'Here are a few powerful options that can be connected automatically to your domain using MagicDomains.' ) }</p>

			<ul className={ styles.hostThumbnailsList } >
				{ this.props.hosts.map( ( host ) => <HostThumbnailContainer { ...host } /> ) }
			</ul>
		</section>;
	}
}

Hosts.propTypes = {
	hosts: PropTypes.arrayOf( PropTypes.object ).isRequired
};

export default withStyles( styles )( Hosts );
