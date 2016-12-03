// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );

// Internal dependencies
import config from 'config';
import DocumentTitle from 'components/ui/document-title';
import { containsAlphanumericCharacters, isDomainSearch, isValidSecondLevelDomain, queryIsInResults, normalizeDomain } from 'lib/domains';
import LoadingPlaceholder from './loading-placeholder';
import styles from './styles.scss';
import Suggestions from './suggestions';
import SearchHeader from './header';
import Button from 'components/ui/button';
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
		showAdditionalResults: PropTypes.func.isRequired,
		sort: PropTypes.string,
		sortChange: PropTypes.func.isRequired
	},

	getDefaultProps() {
		return {
			numberOfResultsToDisplay: config( 'initial_number_of_search_results' ),
			sort: config( 'default_search_sort' )
		};
	},

	componentWillMount() {
		this.debouncedRedirectToSearch = debounce( this.redirectToSearch, 500 );

		const trimmedQuery = this.props.query.trim();

		if ( ! trimmedQuery ) {
			return;
		}

		if ( trimmedQuery !== this.props.query ) {
			this.redirectToSearch( trimmedQuery );
		} else {
			this.props.fetchDomainSuggestions( this.props.query );
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( this.props.query !== nextProps.query ) {
			this.props.fetchDomainSuggestions( nextProps.query );
		}
	},

	redirectToSearch( query ) {
		this.props.redirectToSearch( normalizeDomain( query ), this.props.numberOfResultsToDisplay, this.props.sort );
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
				{ i18n.translate( '{{em}}%(query)s{{/em}} is not available, try these suggestions instead.', {
					args: { query },
					components: {
						em: <em />
					}
				} ) }
			</div>
		);
	},

	renderEmptyQueryMessage() {
		return (
			<LoadingPlaceholder
				isStatic
				text={ i18n.translate( 'Nothing found. Try entering a few words above, like "pet travel blog".' ) }
			/>
		);
	},

	showAdditionalResults( { currentTarget } ) {
		this.props.showAdditionalResults(
			this.props.query,
			this.props.numberOfResultsToDisplay + config( 'initial_number_of_search_results' ),
			this.props.sort
		);
		currentTarget.blur();
	},

	sortChange( event ) {
		this.props.sortChange( this.props.query, event.target.value );
	},

	renderSortOptions() {
		const sortOptions = [
			{
				value: 'recommended',
				text: i18n.translate( 'recommended', {
					comment: "This refers to a list of domains, i.e. 'recommended domains'"
				} )
			},
			{
				value: 'unique',
				text: i18n.translate( 'unique', {
					comment: "This refers to a list of domains, i.e. 'unique domains'"
				} )
			},
			{
				value: 'short',
				text: i18n.translate( 'short', {
					comment: "This refers to a list of domains, i.e. 'short domains'"
				} )
			},
			{
				value: 'affordable',
				text: i18n.translate( 'affordable', {
					comment: "This refers to a list of domains, i.e. 'affordable domains'"
				} )
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

	renderResults() {
		if ( this.props.isRequesting ) {
			return (
				<LoadingPlaceholder text={ i18n.translate( 'Finding your new domain…' ) } />
			);
		}

		return (
			<Suggestions
				count={ this.props.numberOfResultsToDisplay }
				hasLoadedFromServer={ this.props.hasLoadedFromServer }
				results={ this.props.results }
				selectDomain={ this.selectDomain }
				sort={ this.props.sort }
				query={ this.props.query }
			/>
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
						onQueryChange={ this.debouncedRedirectToSearch } />

					{ this.props.hasLoadedFromServer && (
						<div className={ styles.sort }>
							{ i18n.translate( 'Show me {{sortOption/}} domains:', {
								components: {
									sortOption: this.renderSortOptions()
								},
								comment: 'sortOption will be one of "recommended", "unique" or "short"'
							} ) }
						</div>
					) }

					{ exactMatchUnavailable && this.renderDomainUnavailableMessage() }

					{ ! query && this.renderEmptyQueryMessage() }

					{ query && ! containsAlphanumericCharacters( query ) && (
						<div className={ styles.noResultsMessage }>
							{ i18n.translate( "We couldn't find any domains. Try a different search." ) }
						</div>
					) }

					{ this.renderResults() }

					{ this.props.hasLoadedFromServer && showAdditionalResultsLink && (
						<div className={ styles.additionalResultsLinkContainer }>
							<Button onClick={ this.showAdditionalResults } className={ styles.additionalResultsLink }>
								{ i18n.translate( 'Show me more' ) }
								<Gridicon
									className={ styles.gridicon }
									icon="ellipsis"
									size={ 20 }
								/>
							</Button>
						</div>
					) }

				</div>
			</DocumentTitle>
		);
	}
} );

export default withStyles( styles )( withPageView( Search, 'Search' ) );
