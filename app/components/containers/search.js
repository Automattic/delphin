// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import { clearDomainSuggestions, fetchDomainSuggestions, selectDomain } from 'actions/domain-search';
import Search from 'components/ui/search';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	state => ( {
		results: state.domainSearch.results
	} ),
	dispatch => ( {
		clearDomainSuggestions: () => {
			dispatch( clearDomainSuggestions() );
		},
		fetchDomainSuggestions: query => {
			dispatch( fetchDomainSuggestions( query ) );
		},
		selectDomain: name => {
			dispatch( selectDomain( name ) );
		}
	} )
)( Search );
