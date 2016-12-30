// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import config from 'config';
import { clearDomainSearch, clearDomainSuggestions, fetchDomainSuggestions, selectDomain } from 'actions/domain-search';
import Search from 'components/ui/search';
import { redirect } from 'actions/routes';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

export default connect(
	( state, ownProps ) => ( {
		lastQuery: state.domainSearch.query,
		results: state.domainSearch.results,
		hasLoadedFromServer: state.domainSearch.hasLoadedFromServer,
		isRequesting: state.domainSearch.isRequesting,
		initialValues: { query: ownProps.location.query.q },
		numberOfResultsToDisplay: Number( ownProps.location.query.r ) || undefined,
		query: ownProps.location.query.q || '',
		sort: ownProps.location.query.sort,
		defaultTLD: config( 'default_tld' )
	} ),
	( dispatch, ownProps ) => ( {
		resetSearch( query ) {
			dispatch( clearDomainSearch( query ) );
			dispatch( clearDomainSuggestions() );
		},

		// TODO: remove duplicate in search-form.js
		redirectToSearch( query, numberOfResultsToDisplay, sort ) {
			if ( query !== ownProps.location.query.q || config( 'initial_number_of_search_results' ) === numberOfResultsToDisplay ) {
				// reset the result count when the query changes and hide it from the url if it is the default
				numberOfResultsToDisplay = undefined;
			}

			if ( query === '' ) {
				// Instead of adding an empty query parameter in the URL,
				// remove it entirely
				query = undefined;
			}

			// hide sort if it is the default
			sort = sort === config( 'default_search_sort' ) ? undefined : sort;

			dispatch( redirect( 'search', {
				queryParams: {
					q: query,
					r: numberOfResultsToDisplay,
					sort
				}
			} ) );
		},

		selectDomain( domainProduct ) {
			dispatch( recordTracksEvent( 'delphin_search_result_select', {
				is_premium: domainProduct.isPremium,
				relevance: domainProduct.relevance,
				num_results_shown: Number( ownProps.location.query.r ) || config( 'initial_number_of_search_results' )
			} ) );
			dispatch( selectDomain( domainProduct ) );
		},

		fetchDomainSuggestions( query ) {
			withAnalytics(
				domain => recordTracksEvent( 'delphin_domain_search', { search_string: domain } ),
				fetchDomainSuggestions
			)( query )( dispatch );
		},

		showAdditionalResults( query, numberOfResultsToDisplay, sort ) {
			dispatch( recordTracksEvent( 'delphin_results_show_more', { num_results_shown: numberOfResultsToDisplay } ) );
			this.redirectToSearch( query, numberOfResultsToDisplay, sort );
		},

		sortChange( query, value ) {
			dispatch( recordTracksEvent( 'delphin_results_sort', { sort_type: value } ) );
			this.redirectToSearch( query, config( 'initial_number_of_search_results' ), value );
		}
	} ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		fetchDomainSuggestions( query ) {
			if ( query === stateProps.lastQuery ) {
				// no need to fetch the cached query repeatedly
				return;
			}

			dispatchProps.fetchDomainSuggestions( query );
		}
	} )
)( Search );
