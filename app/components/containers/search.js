// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import config from 'config';
import { clearDomainSuggestions, fetchDomainSuggestions, selectDomain } from 'actions/domain-search';
import { isLoggedIn } from 'reducers/user/selectors';
import Search from 'components/ui/search';
import { redirect } from 'actions/routes';

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
		isLoggedIn: isLoggedIn( state ),
		defaultTLD: config( 'default_tld' )
	} ),
	( dispatch, ownProps ) => ( {
		clearDomainSuggestions( query ) {
			dispatch( clearDomainSuggestions( query ) );
		},

		// TODO: remove duplicate in search-form.js
		redirectToSearch( query, numberOfResultsToDisplay, sort ) {
			if ( query !== ownProps.location.query.q || config( 'initial_number_of_search_results' ) === numberOfResultsToDisplay ) {
				// reset the result count when the query changes and hide it from the url if it is the default
				numberOfResultsToDisplay = undefined;
			}

			// hide sort if it is the default
			sort = sort === config( 'default_search_sort' ) ? undefined : sort;

			dispatch( redirect( 'search', {
				q: query,
				r: numberOfResultsToDisplay,
				sort
			} ) );
		},

		selectDomain( domainProduct ) {
			dispatch( selectDomain( domainProduct ) );
			dispatch( redirect( 'confirmDomain', { domain: domainProduct.domainName } ) );
		},

		fetchDomainSuggestions( query ) {
			dispatch( fetchDomainSuggestions( query ) );
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
