// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import Suggestion from './suggestion';

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
		selectDomain: PropTypes.func.isRequired,
		results: PropTypes.array
	},

	getSortedResults() {
		const sortFunctions = {
				recommended: ( a, b ) => b.relevance - a.relevance,
				unique: ( a, b ) => a.relevance - b.relevance,
				short: ( a, b ) => a.domain_name.length - b.domain_name.length,
				affordable: ( a, b ) => {
					const costA = getNumberFromPrice( a.cost ),
						costB = getNumberFromPrice( b.cost );

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

		// Because Array.prototype.sort is not guaranteed to be stable
		// we create a shallow copy of the array via slice()
		// sort that copy and return it without modifying the original results array
		// on the next call we sort it again from the original, which makes the sort "stable"
		return results.slice().sort( sortFunctions[ sort ] );
	},

	render() {
		if ( ! this.props.results ) {
			return null;
		}

		return (
			<ul className={ styles.suggestions }>
				{ this.getSortedResults()
					.slice( 0, this.props.count )
					.map( ( suggestion ) => (
					<Suggestion
						key={ suggestion.domain_name }
						selectDomain={ this.props.selectDomain }
						suggestion={ suggestion } />
				) ) }
			</ul>
		);
	}
} );

export default withStyles( styles )( Suggestions );
