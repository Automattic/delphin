// External dependencies
import { push } from 'react-router-redux';
import { reduxForm, change } from 'redux-form';

// Internal dependencies
import { getPath } from 'routes';
import Home from 'components/ui/home';
import { submitEmptySearch } from 'actions/domain-search';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	state => ( { showEmptySearchNotice: state.ui.domainSearch.showEmptySearchNotice } ),
	dispatch => ( {
		changeQuery( query ) {
			dispatch( change( 'search', 'query', query ) );
		},

		redirectToSearch( query ) {
			dispatch( push( {
				pathname: getPath( 'search' ),
				query: { q: query }
			} ) );
		},

		submitEmptySearch() {
			dispatch( submitEmptySearch() );
		}
	} )
)( Home );
