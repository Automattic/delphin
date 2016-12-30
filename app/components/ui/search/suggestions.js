// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import { omitTld, withTld } from 'lib/domains';
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

	isDomainNameInSuggestions( domainName, suggestions ) {
		return suggestions.some( ( suggestion ) => {
			return domainName === suggestion.domainName;
		} );
	},

	sortSuggestions( suggestions ) {
		const { query, sort } = this.props;

		const terms = query.split( ' ' );

		const sortFunctions = {
			affordable: ( a, b ) => {
				const costA = getNumberFromPrice( a.totalCost );
				const costB = getNumberFromPrice( b.totalCost );

				if ( costA > costB ) {
					return 1;
				}

				if ( costB > costA ) {
					return -1;
				}

				// Uses relevance as a tie breaker if the prices are the same
				return sortFunctions.recommended( a, b );
			},
			recommended: ( a, b ) => {
				// Makes sure exact matches are always shown first
				for ( const term of terms ) {
					if ( term === a.domainName ) {
						return -1;
					} else if ( term === b.domainName ) {
						return 1;
					}
				}

				return b.relevance - a.relevance;
			},
			unique: ( a, b ) => {
				return a.relevance - b.relevance;
			},
			short: ( a, b ) => {
				return a.domainName.length - b.domainName.length;
			}
		};

		// Because Array.prototype.sort is not guaranteed to be stable
		// we create a shallow copy of the array via slice()
		// sort that copy and return it without modifying the original results array
		// on the next call we sort it again from the original, which makes the sort "stable"
		return suggestions.slice().sort( sortFunctions[ sort ] );
	},

	renderDomainUnavailable( domainName ) {
		return (
			<li className={ classNames( styles.suggestion, styles.isTaken, styles.isUnavailable ) } key={ domainName }>
				<div className={ styles.suggestionInfo }>
					<PartialUnderline className={ styles.suggestionTitle }>
						{ domainName }
					</PartialUnderline>

					<div className={ styles.cost }>
						{ i18n.translate( 'This domain is not available. Try some of the other suggestions, or change your search.' ) }
					</div>
				</div>
			</li>
		);
	},

	render() {
		const { hasLoadedFromServer, query, results, selectDomain } = this.props;

		if ( ! hasLoadedFromServer ) {
			return null;
		}

		if ( hasLoadedFromServer && ! results.length ) {
			return (
				<div className={ styles.noResultsMessage }>
					{ i18n.translate( "We couldn't find any domains. Try a different search." ) }
				</div>
			);
		}

		let suggestions = this.sortSuggestions( results );

		const unavailableDomains = new Set();

		const terms = query.split( ' ' );

		let isDomainNameIncludedInTerms = false;

		for ( const term of terms ) {
			if ( term.includes( '.' ) ) {
				// Converts any tld entered by the user to .blog
				const domainName = withTld( term );

				if ( ! this.isDomainNameInSuggestions( domainName, suggestions ) ) {
					unavailableDomains.add( domainName );
				}

				isDomainNameIncludedInTerms = true;
			}
		}

		if ( ! isDomainNameIncludedInTerms || ( terms.length === 1 ) ) {
			// Concatenates all terms (stripping out tlds) to make up for the exact match suggestion
			const domainName = withTld( terms.map( omitTld ).join( '' ) );

			if ( this.isDomainNameInSuggestions( domainName, suggestions ) ) {
				suggestions = suggestions.map( ( suggestion ) => {
					if ( domainName === suggestion.domainName ) {
						return { ...suggestion, isBestMatch: true };
					}

					return suggestion;
				} );
			} else {
				unavailableDomains.add( domainName );
			}
		}

		suggestions = suggestions.slice( 0, this.props.count - unavailableDomains.size );

		return (
			<ul className={ styles.suggestions }>
				{ Array.from( unavailableDomains ).map( ( domainName ) => this.renderDomainUnavailable( domainName ) ) }

				{ suggestions.map( ( suggestion ) => (
					<Suggestion
						isBestMatch={ suggestion.isBestMatch }
						key={ suggestion.domainName }
						selectDomain={ selectDomain }
						suggestion={ suggestion } />
				) ) }
			</ul>
		);
	}
} );

export default withStyles( styles )( Suggestions );
