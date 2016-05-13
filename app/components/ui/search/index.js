// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
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

		return results.sort( sortFunctions[ sort ] );
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
		const { fields: { query } } = this.props,
			showAdditionalResultsLink = this.props.results &&
				this.props.results.length > this.props.numberOfResultsToDisplay;

		return (
			<div>
				<input
					{ ...query }
					autoFocus
					className={ styles.field }
					placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

				<div className={ styles.sort }>
					{
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
