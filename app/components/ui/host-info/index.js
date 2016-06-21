// External dependencies
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { hosts } from 'lib/hosts';
import styles from './styles.scss';

function getCost( cost ) {
	return `${cost.start} - ${cost.end} ${cost.currency}/month`;
}

class HostInfo extends React.Component {
	render() {
		const host = find( hosts, { name: this.props.hostName } );

		return (
			<section>
				<div className={ styles.backLinkContainer }>
					<Link className={ styles.backLink } to={ this.props.backUrl }>← { i18n.translate( 'View All' ) }</Link>
				</div>

				<div className={ styles.header + ' ' + styles[ host.slug ] }>
					<div className={ styles.headerImage + ' ' + styles[ host.slug ] } />
					<button className={ styles.connectButton }>{ i18n.translate( 'Connect Now' ) }</button>
				</div>

				<div className={ styles.content }>
					<p className={ styles.feature }>{ host.longDescription[ 0 ] }</p>
					<div className={ styles.credentialsContainer }>
						<dl className={ styles.credentials } >
							<dt className={ styles.credentialTitle }>COST</dt>
							<dd className={ styles.credentialCost }>{ host.price ? getCost( host.price ) : i18n.translate( 'Free' ) }</dd>
						</dl>
						<dl className={ styles.credentials }>
							<dt className={ styles.credentialTitle }>BEST FOR</dt>
							{ host.bestForTags.map( ( bestTag ) => <dd key={ bestTag } className={ styles.bestForTag }>{ bestTag }</dd> ) }
						</dl>
					</div>
					{
						host.longDescription.slice( 1 ).map( ( paragraph, index ) => <p key={ host.name + 'description' + index } className={ styles.description }>{ paragraph }</p> )
					}
				</div>
			</section>
		);
	}
}

HostInfo.propTypes = {
	backUrl: PropTypes.string.isRequired,
	hostName: PropTypes.string.isRequired
};

export default withStyles( styles )( HostInfo );
