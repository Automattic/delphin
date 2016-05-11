// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getPath } from 'routes';
import i18n from 'lib/i18n';
import Home from 'components/ui/home';

const validate = values => {
	if ( ! values.query ) {
		return { query: i18n.translate( "Hi there! Try something like '%(randomQuery)s'.", {
			args: { randomQuery: 'travel mom foodie' }
		} ) };
	}

	return {};
};

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ],
		validate
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
