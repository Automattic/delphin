// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Suggestion = React.createClass( {
	propTypes: {
		selectDomain: PropTypes.func.isRequired,
		suggestion: PropTypes.object.isRequired
	},

	selectDomain() {
		this.props.selectDomain( this.props.suggestion );
	},

	render() {
		return (
			<li className={ styles.suggestion } onClick={ this.selectDomain }>
				<div className={ styles.suggestionInfo }>
					<span className={ styles.exactMatch }>{ i18n.translate( 'Best match' ) }</span>
					<div className={ styles.suggestionTitle }>
						{ this.props.suggestion.domain_name }
					</div>
					<hr />
					<div className={ styles.cost }>
						{ this.props.suggestion.total_cost }
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
