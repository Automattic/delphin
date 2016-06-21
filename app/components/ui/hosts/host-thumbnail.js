// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router';

// Internal dependencies
import styles from './styles.scss';
import { bindHandlers } from 'lib/class-helpers';

class HostThumbnail extends React.Component {
	constructor( props ) {
		super( props );
		bindHandlers( this );
	}

	handleLearnMoreClick() {
		this.props.redirectToHostInfo( this.props.name );
	}

	handleConnectNowClick() {
		this.props.connectHost( this.props.name );
	}

	render() {
		return (
			<li className={ styles.thumbnail } style={ { backgroundColor: this.props.color } } key={ this.props.name }>
				<img src={ this.props.logoUrl } />
				<h3 className={ styles.thumbnailName }>{ this.props.name }</h3>
				<p className={ styles.thumbnailDescription }>{ this.props.shortDescription }</p>
				<Link className={ styles.thumbnailLearnMore } to={ this.props.learnMoreUrl }>{ i18n.translate( 'Learn More' ) }</Link>
				<a className={ styles.thumbnailConnect } onClick={ this.handleConnectNowClick }><img className={ styles.thumbnailLinkIcon } src="/images/link.svg" />{ i18n.translate( 'Connect Now' ) }</a>
			</li>
		);
	}
}

HostThumbnail.propTypes = {
	color: PropTypes.string.isRequired,
	connectHost: PropTypes.func.isRequired,
	learnMoreUrl: PropTypes.string.isRequired,
	logoUrl: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	redirectToHostInfo: PropTypes.func.isRequired,
	shortDescription: PropTypes.string.isRequired
};

export default withStyles( styles )( HostThumbnail );
