// External dependencies
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// Internal dependencies
import config from 'config';
import { clearDomainSuggestions, fetchDomainSuggestions, selectDomain } from 'actions/domain-search';
import { getPath } from 'routes';
import { isLoggedIn } from 'reducers/user/selectors';
import Search from 'components/ui/search';

export default connect(
	( state, ownProps ) => ( {
		lastQuery: state.domainSearch.query,
		results: state.domainSearch.results,
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

			dispatch( push( {
				pathname: getPath( 'search' ),
				query: {
					q: query,
					r: numberOfResultsToDisplay,
					sort
				}
			} ) );
		},

		selectDomain( name, isUserLoggedIn ) {
			dispatch( selectDomain( name ) );

			if ( isUserLoggedIn ) {
				dispatch( push( getPath( 'contactInformation' ) ) );
			} else {
				dispatch( push( getPath( 'signupUser' ) ) );
			}
		},

		fetchDomainSuggestions( query ) {
			dispatch( fetchDomainSuggestions( query ) );
		}
	} ),
	( stateProps, dispatchProps ) => Object.assign( {}, stateProps, dispatchProps, {
		selectDomain( name ) {
			dispatchProps.selectDomain( name, stateProps.isLoggedIn );
		},

		fetchDomainSuggestions( query ) {
			if ( query === stateProps.lastQuery ) {
				// no need to fetch the cached query repeatedly
				return;
			}

			dispatchProps.fetchDomainSuggestions( query );
		}
	} )
)( Search );
