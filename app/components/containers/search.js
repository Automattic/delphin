// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import { fetchDomainSuggestions, selectDomain } from 'actions';
import Search from 'components/ui/search';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	state => {
		return {
			results: state.domainSearch.results
		};
	},
	dispatch => {
		return {
			fetchDomainSuggestions: query => {
				dispatch( fetchDomainSuggestions( query ) );
			},
			selectDomain: name => {
				dispatch( selectDomain( name ) );
			}
		};
	}
)( Search );
