// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

class DomainWithCustomNameservers extends Component {
	render() {
		const {
			domainName
		} = this.props;
		const nameservers = [];

		return (
			<div className={ classNames( styles.domainCard, styles.connectedNameservers ) }>
				<div className={ styles.domainHeading }>
					<h3>{ domainName }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p>{ i18n.translate( 'This domain has custom name servers.' ) }</p>
					<div className={ styles.nameservers }>
						<div className={ styles.nameserversLoading }>
							{ i18n.translate( 'Fetching name servers…' ) }
						</div>
						<ul className={ styles.nameserversList }>
							{ nameservers.map( nameserver => (
								<li>{ nameserver }</li>
							) ) }
						</ul>
					</div>
				</div>
				<div className={ styles.domainCardFooter }>
					<Link
						to={ getPath( 'updateNameservers', { domainName } ) }
					>{ i18n.translate( 'Change name servers' ) }</Link>
					<a href="#" className={ styles.resetSettings }>{ i18n.translate( 'Revert to default name servers' ) }</a>
				</div>
			</div>
		);
	}
}

DomainWithCustomNameservers.propTypes = {
	domainName: PropTypes.string.isRequired,
};

export default withStyles( styles )( DomainWithCustomNameservers );
