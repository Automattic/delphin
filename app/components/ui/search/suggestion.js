// External dependencies
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Suggestion = React.createClass( {
	propTypes: {
		isBestMatch: PropTypes.bool.isRequired,
		selectDomain: PropTypes.func.isRequired,
		suggestion: PropTypes.object.isRequired
	},

	selectDomain() {
		this.props.selectDomain( this.props.suggestion );
	},

	render() {
		const cost = find( this.props.suggestion.details, { product_slug: 'delphin-domain' } ).cost;

		return (
			<li className={ styles.suggestion } onClick={ this.selectDomain }>
				<div className={ styles.suggestionInfo }>
					{ this.props.isBestMatch && (
						<div className={ styles.exactMatch }>{ i18n.translate( 'Best match' ) }</div>
					) }
					<div className={ styles.suggestionTitle }>
						{ this.props.suggestion.domain_name }
					</div>
					<hr />
					<div className={ styles.cost }>
						{ i18n.translate( '%(cost)s per year', {
							args: { cost }
						} ) }
					</div>
					<div className={ styles.applicationFeeMessage }>
						{ i18n.translate( '+ early application fee' ) }
					</div>
				</div>
				<div className={ styles.buyButton }>
					{ i18n.translate( 'Get started' ) }
				</div>
			</li>
		);
	}
} );

export default withStyles( styles )( Suggestion );
