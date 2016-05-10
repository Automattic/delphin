// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getPath } from 'routes';
import Home from 'components/ui/home';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	undefined,
	dispatch => ( {
		redirectToSearch( query ) {
			dispatch( push( {
				pathname: getPath( 'search' ),
				query: { q: query }
			} ) );
		}
	} )
)( Home );
