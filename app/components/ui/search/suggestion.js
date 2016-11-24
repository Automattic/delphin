// External dependencies
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import PartialUnderline from 'components/ui/partial-underline';
import styles from './styles.scss';

const Suggestion = React.createClass( {
	propTypes: {
		checkDomainAvailability: PropTypes.func.isRequired,
		isBestMatch: PropTypes.bool.isRequired,
		selectDomain: PropTypes.func.isRequired,
		suggestion: PropTypes.object.isRequired
	},

	selectDomain() {
		// Do an availability check
		this.props.checkDomainAvailability( this.props.suggestion );
		// We'll need some analytics here
		/*dispatch( recordTracksEvent( 'delphin_search_result_select', {
			is_premium: domainProduct.isPremium,
			relevance: domainProduct.relevance,
			num_results_shown: Number( ownProps.location.query.r ) || config( 'initial_number_of_search_results' )
		} ) );*/

		// If the domain is available then select it
		//this.props.selectDomain( this.props.suggestion );

		// Otherwise show a message to the user
	},

	render() {
		const domainDetails = find( this.props.suggestion.details, { productSlug: 'delphin-domain' } );
		const { cost } = domainDetails;

		return (
			<li className={ styles.suggestion } onClick={ this.selectDomain }>
				<div className={ styles.suggestionInfo }>
					{ this.props.isBestMatch && (
						<div className={ styles.exactMatch }>{ i18n.translate( 'Best match' ) }</div>
					) }
					<PartialUnderline className={ styles.suggestionTitle }>
						{ this.props.suggestion.domainName }
					</PartialUnderline>
					<div className={ styles.cost }>
						{ i18n.translate( '%(cost)s per year', {
							args: { cost }
						} ) }
					</div>
				</div>
				<div className={ styles.buyButton }>
					{ i18n.translate( 'Select' ) }
				</div>
			</li>
		);
	}
} );

export default withStyles( styles )( Suggestion );
