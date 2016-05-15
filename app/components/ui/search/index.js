// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
import some from 'lodash/some';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import { isDomainSearch, secondLevelDomainOf, isValidSecondLevelDomain } from 'lib/domains';
import styles from './styles.scss';
import Suggestions from './suggestions';
import SearchHeader from './header';

const Search = React.createClass( {
	propTypes: {
		fetchDomainSuggestions: PropTypes.func.isRequired,
		query: PropTypes.string.isRequired,
		numberOfResultsToDisplay: PropTypes.number,
		redirectToCheckout: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToSignup: PropTypes.func.isRequired,
		results: PropTypes.array,
		selectDomain: PropTypes.func.isRequired,
		sort: PropTypes.string,
		user: PropTypes.object.isRequired
	},

	getDefaultProps() {
		return {
			numberOfResultsToDisplay: config( 'initial_number_of_search_results' ),
			sort: config( 'default_search_sort' )
		};
	},

	componentWillMount() {
		this.debouncedFetchResults = debounce( this.fetchResults, 500 );
		this.fetchResults( this.props.query );
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

	isExactMatchUnavailable() {
		const { query, isRequesting, results } = this.props;

		return ! isRequesting &&
			isDomainSearch( query ) &&
			results && ! some( results, ( result ) => {
				return result.domain_name === query || secondLevelDomainOf( result.domain_name ) === query;
			} );
	},

	renderDomainUnavailableMessage() {
		let { query } = this.props;

		if ( isValidSecondLevelDomain( query ) ) {
			query = `${ query }.${ this.props.defaultTLD }`;
		}

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

	showAdditionalResults() {
		this.props.redirectToSearch(
			this.props.query,
			this.props.numberOfResultsToDisplay + config( 'initial_number_of_search_results' ),
			this.props.sort
		);
	},

	sortChange( event ) {
		this.props.redirectToSearch( this.props.query, config( 'initial_number_of_search_results' ), event.target.value );
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
		const query = this.props.query,
			exactMatchUnavailable = this.isExactMatchUnavailable(),
			showAdditionalResultsLink = this.props.results &&
				this.props.results.length > this.props.numberOfResultsToDisplay;

		return (
			<div className={ styles.search }>
				<SearchHeader
					{ ... { query } }
					onQueryChange={ this.debouncedFetchResults } />

				{ exactMatchUnavailable && this.renderDomainUnavailableMessage() }

				<div className={ styles.sort }>
					{ exactMatchUnavailable && (
						i18n.translate( "Don't fret, check out these {{sortOption/}} addresses:", {
							components: {
								context: 'sortOption will be one of "recommended", "unique" or "short"',
								sortOption: this.renderSortOptions()
							}
						} )
					) }
					{ ! exactMatchUnavailable && (
						i18n.translate( 'Show me {{sortOption/}} addresses for my blog:', {
							components: {
								context: 'sortOption will be one of "recommended", "unique" or "short"',
								sortOption: this.renderSortOptions()
							}
						} )
					) }

				</div>

				<Suggestions
					count={ this.props.numberOfResultsToDisplay }
					results={ this.props.results }
					selectDomain={ this.selectDomain }
					sort={ this.props.sort } />

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
