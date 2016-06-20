// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

function getCost( cost ) {
	return `${cost.start} - ${cost.end} ${cost.currency}/month`;
}

class HostInfo extends React.Component {
	render() {
		return <section>
			<Link to={ this.props.backUrl }>←  { i18n.translate( 'View All' ) }</Link>

			<h2>{ this.props.host.name }</h2>
			<a>{ i18n.translate( 'Connect Now' ) }</a>
			<p className={ styles.feature }>{ this.props.host.longDescription[0] }</p>
			<dl className={ styles.credentials } >
				<dt className={ styles.credentialTitle }>COST</dt>
				<dd className={ styles.credentialCost }>{ this.props.host.price ? getCost( this.props.host.price ) : i18n.translate( 'Free' ) }</dd>

				<dt className={ styles.credentialTitle }>BEST FOR</dt>
				{ this.props.host.bestForTags.map( ( bestTag ) => <dd key={ bestTag } className={ styles.bestForTag }>{ bestTag }</dd> ) }
			</dl>
			{
				this.props.host.longDescription.slice( 1 ).map( ( paragraph, index ) => <p key={ this.props.host.name + 'description' + index } className={ styles.description }>{ paragraph }</p> )
			}
		</section>;
	}
}

export default withStyles( styles )( HostInfo );
