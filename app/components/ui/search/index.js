// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import DocumentTitle from 'components/ui/document-title';
import { isDomainSearch, isValidSecondLevelDomain, queryIsInResults } from 'lib/domains';
import styles from './styles.scss';
import Suggestions from './suggestions';
import SearchHeader from './header';
import withPageView from 'lib/analytics/with-page-view';

const Search = React.createClass( {
	propTypes: {
		defaultTLD: PropTypes.string.isRequired,
		fetchDomainSuggestions: PropTypes.func.isRequired,
		hasLoadedFromServer: PropTypes.bool.isRequired,
		isRequesting: PropTypes.bool.isRequired,
		numberOfResultsToDisplay: PropTypes.number,
		query: PropTypes.string.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
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

	componentWillMount() {
		this.debouncedFetchResults = debounce( this.fetchResults, 500 );

		const trimmedQuery = this.props.query.trim();
		if ( this.props.query !== trimmedQuery ) {
			this.props.redirectToSearch( trimmedQuery, this.props.numberOfResultsToDisplay, this.props.sort );
		}

		this.fetchResults( trimmedQuery );
	},

	fetchResults( query ) {
		this.props.redirectToSearch( query, this.props.numberOfResultsToDisplay, this.props.sort );
		this.props.fetchDomainSuggestions( query );
	},

	selectDomain( suggestion ) {
		this.props.selectDomain( suggestion );
	},

	isExactMatchUnavailable() {
		const { query, isRequesting, results } = this.props;

		return ! isRequesting &&
			isDomainSearch( query ) &&
			results && ! queryIsInResults( results, query );
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
			<DocumentTitle title={ i18n.translate( 'Search' ) }>
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
							i18n.translate( 'Show me {{sortOption/}} domains:', {
								components: {
									context: 'sortOption will be one of "recommended", "unique" or "short"',
									sortOption: this.renderSortOptions()
								}
							} )
						) }

					</div>

					<Suggestions
						count={ this.props.numberOfResultsToDisplay }
						hasLoadedFromServer={ this.props.hasLoadedFromServer }
						results={ this.props.results }
						selectDomain={ this.selectDomain }
						sort={ this.props.sort }
						query={ this.props.query }
					/>

					{ showAdditionalResultsLink && (
						<div className={ styles.additionalResultsLinkContainer }>
							<a onClick={ this.showAdditionalResults } className={ styles.additionalResultsLink }>
								{ i18n.translate( 'Show me more' ) }
							</a>
						</div>
					) }
				</div>
			</DocumentTitle>
		);
	}
} );

export default withStyles( styles )( withPageView( Search, 'Search' ) );
