// External dependencies
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// Internal dependencies
import config from 'config';
import { selectDomain } from 'actions/domain-search';
import { getPath } from 'routes';
import Search from 'components/ui/search';

export default connect(
	( state, ownProps ) => ( {
		results: state.domainSearch.results,
		user: state.user,
		numberOfResultsToDisplay: Number( ownProps.location.query.r ) || undefined
	} ),
	( dispatch, ownProps ) => ( {
		redirectToCheckout() {
			dispatch( push( getPath( 'checkout' ) ) );
		},

		// TODO: remove duplicate in search-form.js
		redirectToSearch( query, numberOfResultsToDisplay ) {
			if ( query !== ownProps.location.query.q || config( 'initial_number_of_search_results' ) === numberOfResultsToDisplay ) {
				// reset the result count when the query changes and hide it from the url if it is the default
				numberOfResultsToDisplay = undefined;
			}

			dispatch( push( {
				pathname: getPath( 'search' ),
				query: { q: query, r: numberOfResultsToDisplay }
			} ) );
		},


		redirectToSignup() {
			dispatch( push( getPath( 'signupUser' ) ) );
		},
		selectDomain( name ) {
			dispatch( selectDomain( name ) );
		}
	} )
)( Search );
