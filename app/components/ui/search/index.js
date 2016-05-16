// External dependencies
import i18n from 'i18n-calypso';
import some from 'lodash/some';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import { isAvailableDomainName } from 'lib/domains';
import SearchForm from './form';
import styles from './styles.scss';
import Suggestion from './suggestion';

/**
 * Strips all non-digits/decimals from a string and casts it to a number.
 *
 * @param {string} price A price, e.g. '$18.99'
 * @return {number} A number representing the given price, e.g. 18.99
 */
const getNumberFromPrice = price => Number( price.replace( /[^0-9.]/g, '' ) );

const Search = React.createClass( {
	propTypes: {
		fetchDomainSuggestions: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		numberOfResultsToDisplay: PropTypes.number,
		results: PropTypes.array,
		selectDomain: PropTypes.func.isRequired,
		sort: PropTypes.string
	},

	getDefaultProps() {
		return {
			numberOfResultsToDisplay: config( 'initial_number_of_search_results' ),
			sort: config( 'default_search_sort' )
		};
	},

	componentDidMount() {
		this.debouncedFetchResults = debounce( this.fetchResults, 500 );
	},

	componentWillReceiveProps( nextProps ) {
		if ( this.props.fields.query.value !== nextProps.fields.query.value ) {
			this.props.clearDomainSuggestions();
			this.debouncedFetchResults( nextProps.fields.query.value );
		}
	},

	fetchResults( query ) {
		this.props.redirectToSearch( query, this.props.numberOfResultsToDisplay, this.props.sort );
		this.props.fetchDomainSuggestions( query );
	},

	selectDomain( name ) {
		this.props.selectDomain( name );

		if ( this.props.user.isLoggedIn ) {
			this.props.redirectToCheckout();
		} else {
			this.props.redirectToSignup();
		}
	},

	isExactMatchUnAvailable() {
		const { values: { query }, isFetching, results } = this.props;

		return ! isFetching &&
			isAvailableDomainName( query ) &&
			! some( results, ( result ) => {
				return result.domain_name === query;
			} );
	},

	renderDomainUnavailableMessage() {
		const { values: { query } } = this.props;

		return (
			<div className={ styles.searchInfo }>
				{ i18n.translate( 'Darn, {{em}}%(query)s{{/em}} has already been snatched up!', {
					args: { query },
					components: {
						em: <em />
					}
				} ) }
			</div>
		);
	},

	showAdditionalResults( event ) {
		event.preventDefault();

		this.props.redirectToSearch(
			this.props.values.query,
			this.props.numberOfResultsToDisplay + config( 'initial_number_of_search_results' ),
			this.props.sort
		);
	},

	sortChange( event ) {
		this.props.redirectToSearch( this.props.values.query, config( 'initial_number_of_search_results' ), event.target.value );
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

	renderResults() {
		if ( ! this.props.results ) {
			return null;
		}

		const suggestions = this.getSortedResults()
			.slice( 0, this.props.numberOfResultsToDisplay )
			.map( ( suggestion ) => (
				<Suggestion
					key={ suggestion.domain_name }
					selectDomain={ this.selectDomain }
					suggestion={ suggestion } />
			) );

		return (
			<div>
				<ul className={ styles.suggestions }>
					{ suggestions }
				</ul>
			</div>
		);
	},

	renderSortOptions() {
		const sortOptions = [
			{
				value: 'recommended',
				text: i18n.translate( 'recommended' )
			},
			{
				value: 'unique',
				text: i18n.translate( 'unique' )
			},
			{
				value: 'short',
				text: i18n.translate( 'short' )
			},
			{
				value: 'affordable',
				text: i18n.translate( 'affordable' )
			}
		];

		return (
			<select
				className={ styles.sortSelect }
				onChange={ this.sortChange }
				value={ this.props.sort }>
				{ sortOptions.map( sort => (
					<option key={ sort.value } value={ sort.value }>{ sort.text }</option>
				) ) }
			</select>
		);
	},

	render() {
		const showAdditionalResultsLink = this.props.results &&
				this.props.results.length > this.props.numberOfResultsToDisplay,
			exactMatchUnavailable = this.isExactMatchUnAvailable();

		return (
			<div>
				<SearchForm
					fetchDomainSuggestions={ this.props.fetchDomainSuggestions }
					fields={ this.props.fields }
					redirectToSearch={ this.props.redirectToSearch } />

				{ exactMatchUnavailable && this.renderDomainUnavailableMessage() }

				<div className={ styles.sort }>
					{
						exactMatchUnavailable &&
							i18n.translate( "Don't fret, check out these {{sortOption/}} addresses:", {
								components: {
									context: 'sortOption will be one of "recommended", "unique" or "short"',
									sortOption: this.renderSortOptions()
								}
							} )
					}
					{
						! exactMatchUnavailable &&
							i18n.translate( 'Show me {{sortOption/}} addresses for my blog:', {
								components: {
									context: 'sortOption will be one of "recommended", "unique" or "short"',
									sortOption: this.renderSortOptions()
								}
							} )
					}
				</div>

				{ this.renderResults() }

				{ showAdditionalResultsLink && (
					<div className={ styles.additionalResultsLinkContainer }>
						<a onClick={ this.showAdditionalResults } className={ styles.additionalResultsLink }>
							{ i18n.translate( 'Show me more' ) }
						</a>
					</div>
				) }
			</div>
		);
	}
} );

export default withStyles( styles )( Search );
