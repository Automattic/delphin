// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import config from 'config';
import { fetchDomainSuggestions } from 'actions/domain-search';
import { getPath } from 'routes';
import SearchForm from 'components/ui/search/form';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	( state, ownProps ) => ( {
		results: state.domainSearch.results,
		initialValues: { query: ownProps.location && ownProps.location.query.q }
	} ),
	( dispatch, ownProps ) => ( {
		fetchDomainSuggestions( query ) {
			dispatch( fetchDomainSuggestions( query ) );
		},
		redirectToSearch( query, numberOfResultsToDisplay ) {
			if ( query !== ownProps.location.query.q || config( 'initial_number_of_search_results' ) === numberOfResultsToDisplay ) {
				// reset the result count when the query changes and hide it from the url if it is the default
				numberOfResultsToDisplay = undefined;
			}

			dispatch( push( {
				pathname: getPath( 'search' ),
				query: { q: query, r: numberOfResultsToDisplay }
			} ) );
		}
	} )
)( SearchForm );
