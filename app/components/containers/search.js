// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { clearDomainSuggestions, fetchDomainSuggestions, selectDomain } from 'actions/domain-search';
import { getPath } from 'routes';
import Search from 'components/ui/search';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ],
		// we want these searches to persist on the results route, otherwise we'll destroy them manually
		destroyOnUnmount: false
	},
	state => ( {
		hasSearched: state.domainSearch.hasSearched,
		results: state.domainSearch.results
	} ),
	dispatch => ( {
		clearDomainSuggestions() {
			dispatch( clearDomainSuggestions() );
		},
		fetchDomainSuggestions( query ) {
			dispatch( fetchDomainSuggestions( query ) );
		},
		redirectToSearchResults() {
			dispatch( push( getPath( 'searchResults' ) ) );
		},
		selectDomain( name ) {
			dispatch( selectDomain( name ) );
		}
	} )
)( Search );
