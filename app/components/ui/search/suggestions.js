// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { omitTld, queryIsInResults, withTld } from 'lib/domains';
import styles from './styles.scss';
import PartialUnderline from 'components/ui/partial-underline';
import Suggestion from 'components/containers/suggestion';

/**
 * Strips all non-digits/decimals from a string and casts it to a number.
 *
 * @param {string} price A price, e.g. '$18.99'
 * @return {number} A number representing the given price, e.g. 18.99
 */
const getNumberFromPrice = price => Number( price.replace( /[^0-9.]/g, '' ) );

const Suggestions = React.createClass( {
	propTypes: {
		count: PropTypes.number,
		hasLoadedFromServer: PropTypes.bool.isRequired,
		query: PropTypes.string,
		results: PropTypes.array,
		selectDomain: PropTypes.func.isRequired,
		sort: PropTypes.string.isRequired
	},

	getSortedResults() {
		const sortFunctions = {
				recommended: ( a, b ) => b.relevance - a.relevance,
				unique: ( a, b ) => a.relevance - b.relevance,
				short: ( a, b ) => a.domainName.length - b.domainName.length,
				affordable: ( a, b ) => {
					const costA = getNumberFromPrice( a.totalCost ),
						costB = getNumberFromPrice( b.totalCost );

					if ( costA > costB ) {
						return 1;
					}

					if ( costB > costA ) {
						return -1;
					}

					// if the prices are the same, use relevance as a tie breaker
					return sortFunctions.recommended( a, b );
				}
			},
			{ results, sort } = this.props;

		let { count } = this.props;

		if ( this.isExactMatchUnavailable() && count < results.length ) {
			count -= 1;
		}

		// Because Array.prototype.sort is not guaranteed to be stable
		// we create a shallow copy of the array via slice()
		// sort that copy and return it without modifying the original results array
		// on the next call we sort it again from the original, which makes the sort "stable"
		return results.slice().sort( sortFunctions[ sort ] ).slice( 0, count );
	},

	isExactMatchUnavailable() {
		const { query, results } = this.props;

		return results && ! queryIsInResults( results, this.normalizeQuery( query ) );
	},

	normalizeQuery() {
		const { query } = this.props;

		// Removes any tld from the end of keywords
		const queryWithoutTlds = query.replace( /\.[^\s]*/g, '' );

		// Removes all spaces to retrieve the best match
		return queryWithoutTlds.replace( /\s+/g, '' );
	},

	renderExactMatchTaken() {
		if ( ! this.isExactMatchUnavailable() ) {
			return;
		}

		return (
			<li className={ classNames( styles.suggestion, styles.isTaken, styles.isUnavailable ) }>
				<div className={ styles.suggestionInfo }>
					<PartialUnderline className={ styles.suggestionTitle }>
						{ withTld( this.normalizeQuery( this.props.query ) ) }
					</PartialUnderline>

					<div className={ styles.cost }>
						{ i18n.translate( 'This domain is not available. Try some of the other suggestions, or change your search.' ) }
					</div>
				</div>
			</li>
		);
	},

	render() {
		if ( ! this.props.hasLoadedFromServer ) {
			return null;
		}

		if ( this.props.hasLoadedFromServer && ! this.props.results.length ) {
			return (
				<div className={ styles.noResultsMessage }>
					{ i18n.translate( "We couldn't find any domains. Try a different search." ) }
				</div>
			);
		}

		const query = this.normalizeQuery( this.props.query );

		return (
			<ul className={ styles.suggestions }>
				{ this.renderExactMatchTaken() }

				{ this.getSortedResults().map( ( suggestion ) => (
					<Suggestion
						isBestMatch={ query === omitTld( suggestion.domainName ) }
						key={ suggestion.domainName }
						selectDomain={ this.props.selectDomain }
						suggestion={ suggestion } />
				) ) }
			</ul>
		);
	}
} );

export default withStyles( styles )( Suggestions );
